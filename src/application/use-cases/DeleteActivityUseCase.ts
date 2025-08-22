import { ActivityRepository } from '@/domain/repositories/ActivityRepository';
import { ExpenseRepository } from '@/domain/repositories/ExpenseRepository';

export interface DeleteActivityRequest {
  activityId: string;
}

export interface DeleteActivityResponse {
  success: boolean;
  error?: string;
}

export class DeleteActivityUseCase {
  constructor(
    private activityRepository: ActivityRepository,
    private expenseRepository: ExpenseRepository
  ) {}

  async execute(request: DeleteActivityRequest): Promise<DeleteActivityResponse> {
    try {
      await this.expenseRepository.deleteByActivityId(request.activityId);
      await this.activityRepository.delete(request.activityId);

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
