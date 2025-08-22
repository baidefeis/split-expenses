import { ExpenseEntity } from '@/domain/entities/Expense';
import { UserEntity } from '@/domain/entities/User';

interface ExpenseSummaryProps {
  expenses: ExpenseEntity[];
  users: UserEntity[];
  onDeleteExpense: (expenseId: string) => Promise<boolean>;
}

export function ExpenseSummary({ expenses, users, onDeleteExpense }: ExpenseSummaryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food': return '🍽️';
      case 'transport': return '🚗';
      case 'entertainment': return '🎉';
      case 'accommodation': return '🏨';
      default: return '📦';
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <div className="text-lg font-bold text-purple-600">
          Total: €{totalAmount.toFixed(2)}
        </div>
      </div>
      
      <div className="space-y-3">
        {expenses.map(expense => {
          const payer = users.find(u => u.id === expense.paidById);
          const participants = users.filter(u => expense.participantIds.includes(u.id));
          
          return (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="text-xl">
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {expense.description}
                  </div>
                  <div className="text-sm text-gray-600">
                    €{expense.amount.toFixed(2)} • {payer?.name || 'Unknown'} → {participants.length} people
                  </div>
                </div>
              </div>
              
              <button
                onClick={async () => {
                  if (confirm(`Delete "${expense.description}"?`)) {
                    await onDeleteExpense(expense.id);
                  }
                }}
                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                title="Delete expense"
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
