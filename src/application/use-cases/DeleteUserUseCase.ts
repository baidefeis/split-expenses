import { UserRepository } from '@/domain/repositories/UserRepository';
import { ExpenseRepository } from '@/domain/repositories/ExpenseRepository';
import { ActivityRepository } from '@/domain/repositories/ActivityRepository';
import { ActivityEntity } from '@/domain/entities/Activity';

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private expenseRepository: ExpenseRepository,
    private activityRepository: ActivityRepository
  ) {}

  async execute(userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const userExpenses = await this.expenseRepository.findByUserId(userId);
      if (userExpenses.length > 0) {
        return { 
          success: false, 
          message: `Cannot delete ${user.name}. They have ${userExpenses.length} expense(s). Delete their expenses first.` 
        };
      }

      const activities = await this.activityRepository.findAll();
      for (const activity of activities) {
        if (activity.participants.includes(userId)) {
          const updatedParticipants = activity.participants.filter(id => id !== userId);
          const updatedActivity = new ActivityEntity(
            activity.id,
            activity.name,
            activity.createdAt,
            updatedParticipants,
            activity.description
          );
          await this.activityRepository.update(updatedActivity);
        }
      }

      await this.userRepository.delete(userId);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete user' };
    }
  }
}
