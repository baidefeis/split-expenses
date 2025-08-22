import { UserRepository } from '@/domain/repositories/UserRepository';
import { UserEntity } from '@/domain/entities/User';
import { areNamesEqual } from '@/utils/stringUtils';

export class LocalStorageUserRepository implements UserRepository {
  private static readonly STORAGE_KEY = 'splitExpenses_users';

  async save(user: UserEntity): Promise<void> {
    const users = await this.findAll();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(LocalStorageUserRepository.STORAGE_KEY, JSON.stringify(users));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const users = await this.findAll();
    return users.find(user => user.id === id) || null;
  }

  async findByName(name: string): Promise<UserEntity | null> {
    const users = await this.findAll();
    return users.find(user => areNamesEqual(user.name, name)) || null;
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const data = localStorage.getItem(LocalStorageUserRepository.STORAGE_KEY);
      if (!data) return [];
      
      const usersData = JSON.parse(data);
      return usersData.map((data: any) => new UserEntity(
        data.id,
        data.name,
        data.email
      ));
    } catch (error) {
      return [];
    }
  }

  async delete(id: string): Promise<void> {
    const users = await this.findAll();
    const filteredUsers = users.filter(user => user.id !== id);
    localStorage.setItem(LocalStorageUserRepository.STORAGE_KEY, JSON.stringify(filteredUsers));
  }

  async update(user: UserEntity): Promise<void> {
    await this.save(user);
  }
}
