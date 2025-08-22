import { UserEntity } from '../entities/User';

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByName(name: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  delete(id: string): Promise<void>;
  update(user: UserEntity): Promise<void>;
}
