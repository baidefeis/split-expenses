import { ExpenseEntity } from '../entities/Expense';

export interface ExpenseRepository {
  save(expense: ExpenseEntity): Promise<void>;
  findById(id: string): Promise<ExpenseEntity | null>;
  findByActivityId(activityId: string): Promise<ExpenseEntity[]>;
  findByUserId(userId: string): Promise<ExpenseEntity[]>;
  findAll(): Promise<ExpenseEntity[]>;
  delete(id: string): Promise<void>;
  deleteByActivityId(activityId: string): Promise<void>;
  update(expense: ExpenseEntity): Promise<void>;
}
