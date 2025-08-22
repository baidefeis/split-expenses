import { ExpenseRepository } from '@/domain/repositories/ExpenseRepository';

export interface DeleteExpenseRequest {
  expenseId: string;
}

export interface DeleteExpenseResponse {
  success: boolean;
  error?: string;
}

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute(request: DeleteExpenseRequest): Promise<DeleteExpenseResponse> {
    try {
      await this.expenseRepository.delete(request.expenseId);

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
