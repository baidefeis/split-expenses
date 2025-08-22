import { ActivityEntity } from '../../domain/entities/Activity';
import { ActivityRepository } from '../../domain/repositories/ActivityRepository';

interface CreateActivityResult {
  activity: ActivityEntity;
  wasCreated: boolean;
  message?: string;
}

export class CreateActivityUseCase {
  constructor(private activityRepository: ActivityRepository) {}

  async execute(params: {
    name: string;
    description?: string;
    participants?: string[];
  }): Promise<CreateActivityResult> {
    const existingActivity = await this.activityRepository.findByName(params.name);
    
    if (existingActivity) {
      return {
        activity: existingActivity,
        wasCreated: false,
        message: `Activity "${params.name}" already exists`
      };
    }

    const id = this.generateId();
    
    const activity = new ActivityEntity(
      id,
      params.name,
      new Date(),
      params.participants || [],
      params.description
    );

    await this.activityRepository.save(activity);
    
    return {
      activity,
      wasCreated: true
    };
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
