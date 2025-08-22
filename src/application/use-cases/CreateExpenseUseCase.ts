import { ExpenseEntity, ExpenseCategory } from '@/domain/entities/Expense';
import { ExpenseRepository } from '@/domain/repositories/ExpenseRepository';

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  category: ExpenseCategory;
  paidById: string;
  activityId: string;
  participantIds: string[];
}

export interface CreateExpenseResponse {
  success: boolean;
  expense?: ExpenseEntity;
  error?: string;
}

export class CreateExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute(request: CreateExpenseRequest): Promise<CreateExpenseResponse> {
    try {
      const expense = new ExpenseEntity(
        this.generateExpenseId(),
        request.description,
        request.amount,
        request.category,
        request.paidById,
        request.activityId,
        request.participantIds
      );

      await this.expenseRepository.save(expense);

      return {
        success: true,
        expense
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private generateExpenseId(): string {
    return `expense_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
