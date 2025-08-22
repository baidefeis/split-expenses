import { ActivityEntity } from '../entities/Activity';

export interface ActivityRepository {
  save(activity: ActivityEntity): Promise<void>;
  findById(id: string): Promise<ActivityEntity | null>;
  findByName(name: string): Promise<ActivityEntity | null>;
  findAll(): Promise<ActivityEntity[]>;
  delete(id: string): Promise<void>;
  update(activity: ActivityEntity): Promise<void>;
}
