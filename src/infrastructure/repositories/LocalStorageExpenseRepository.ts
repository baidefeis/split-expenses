import { ExpenseRepository } from '@/domain/repositories/ExpenseRepository';
import { ExpenseEntity } from '@/domain/entities/Expense';

export class LocalStorageExpenseRepository implements ExpenseRepository {
  private static readonly STORAGE_KEY = 'splitExpenses_expenses';

  async save(expense: ExpenseEntity): Promise<void> {
    const expenses = await this.findAll();
    const index = expenses.findIndex(e => e.id === expense.id);
    
    if (index >= 0) {
      expenses[index] = expense;
    } else {
      expenses.push(expense);
    }
    
    localStorage.setItem(LocalStorageExpenseRepository.STORAGE_KEY, JSON.stringify(expenses));
  }

  async findById(id: string): Promise<ExpenseEntity | null> {
    const expenses = await this.findAll();
    return expenses.find(expense => expense.id === id) || null;
  }

  async findByActivityId(activityId: string): Promise<ExpenseEntity[]> {
    const expenses = await this.findAll();
    return expenses.filter(expense => expense.belongsToActivity(activityId));
  }

  async findByUserId(userId: string): Promise<ExpenseEntity[]> {
    const expenses = await this.findAll();
    return expenses.filter(expense => 
      expense.paidById === userId || expense.participantIds.includes(userId)
    );
  }

  async update(expense: ExpenseEntity): Promise<void> {
    await this.save(expense);
  }

  async findAll(): Promise<ExpenseEntity[]> {
    try {
      const data = localStorage.getItem(LocalStorageExpenseRepository.STORAGE_KEY);
      if (!data) return [];
      
      const expensesData = JSON.parse(data);
      return expensesData.map((data: any) => new ExpenseEntity(
        data.id,
        data.description,
        data.amount,
        data.category,
        data.paidById,
        data.activityId,
        data.participantIds,
        new Date(data.createdAt)
      ));
    } catch (error) {
      return [];
    }
  }

  async delete(id: string): Promise<void> {
    const expenses = await this.findAll();
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem(LocalStorageExpenseRepository.STORAGE_KEY, JSON.stringify(filteredExpenses));
  }

  async deleteByActivityId(activityId: string): Promise<void> {
    const expenses = await this.findAll();
    const filteredExpenses = expenses.filter(expense => !expense.belongsToActivity(activityId));
    localStorage.setItem(LocalStorageExpenseRepository.STORAGE_KEY, JSON.stringify(filteredExpenses));
  }
}
