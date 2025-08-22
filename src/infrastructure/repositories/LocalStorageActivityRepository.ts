import { ActivityEntity } from '../../domain/entities/Activity';
import { ActivityRepository } from '../../domain/repositories/ActivityRepository';
import { areNamesEqual } from '@/utils/stringUtils';

export class LocalStorageActivityRepository implements ActivityRepository {
  private static readonly STORAGE_KEY = 'splitExpenses_activities';

  async save(activity: ActivityEntity): Promise<void> {
    const activities = await this.findAll();
    const existingIndex = activities.findIndex(a => a.id === activity.id);
    
    if (existingIndex >= 0) {
      activities[existingIndex] = activity;
    } else {
      activities.push(activity);
    }
    
    this.saveToStorage(activities);
  }

  async findById(id: string): Promise<ActivityEntity | null> {
    const activities = await this.findAll();
    return activities.find(activity => activity.id === id) || null;
  }

  async findByName(name: string): Promise<ActivityEntity | null> {
    const activities = await this.findAll();
    return activities.find(activity => areNamesEqual(activity.name, name)) || null;
  }

  async findAll(): Promise<ActivityEntity[]> {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(LocalStorageActivityRepository.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const data = JSON.parse(stored);
      return data.map((item: any) => new ActivityEntity(
        item.id,
        item.name,
        new Date(item.createdAt),
        item.participants || [],
        item.description
      ));
    } catch {
      return [];
    }
  }

  async delete(id: string): Promise<void> {
    const activities = await this.findAll();
    const filtered = activities.filter(activity => activity.id !== id);
    this.saveToStorage(filtered);
  }

  async update(activity: ActivityEntity): Promise<void> {
    await this.save(activity);
  }

  private saveToStorage(activities: ActivityEntity[]): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(LocalStorageActivityRepository.STORAGE_KEY, JSON.stringify(activities));
  }
}
