import { useState, useEffect } from 'react';
import { ExpenseCategory } from '@/domain/entities/Expense';
import { UserEntity } from '@/domain/entities/User';
import { useLanguage } from '@/context/LanguageContext';

interface QuickExpenseFormProps {
  participants: UserEntity[];
  onSubmit: (expense: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    paidById: string;
    participantIds: string[];
  }) => Promise<boolean>;
}

export function QuickExpenseForm({ participants, onSubmit }: QuickExpenseFormProps) {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.FOOD);
  const [paidById, setPaidById] = useState('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (participants.length > 0) {
      setParticipantIds(participants.map(p => p.id));
    }
  }, [participants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || !paidById || participantIds.length === 0) return;

    setIsSubmitting(true);
    const success = await onSubmit({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      paidById,
      participantIds
    });

    if (success) {
      setDescription('');
      setAmount('');
      setPaidById('');
      setParticipantIds(participants.map(p => p.id));
    }
    setIsSubmitting(false);
  };

  const toggleAllParticipants = () => {
    if (participantIds.length === participants.length) {
      setParticipantIds([]);
    } else {
      setParticipantIds(participants.map(p => p.id));
    }
  };

  const isFormValid = description.trim() && amount && paidById && participantIds.length > 0;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg border-2 border-purple-200">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3">💸</div>
        <h2 className="text-2xl font-bold text-purple-900">{t('quickExpenseForm')}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('description')}
            </label>
            <input
              type="text"
              placeholder={t('expenseDescriptionPlaceholder')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('amount')} (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('category')}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
              <option value={ExpenseCategory.FOOD}>🍽️ {t('food')}</option>
              <option value={ExpenseCategory.TRANSPORT}>🚗 {t('transport')}</option>
              <option value={ExpenseCategory.ENTERTAINMENT}>🎉 {t('entertainment')}</option>
              <option value={ExpenseCategory.ACCOMMODATION}>🏨 {t('accommodation')}</option>
              <option value={ExpenseCategory.OTHER}>📦 {t('other')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('whoPaid')}
            </label>
            <select
              value={paidById}
              onChange={(e) => setPaidById(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
              <option value="">{t('selectPayer')}</option>
              {participants.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              {t('whoParticipated')}
            </label>
            <button
              type="button"
              onClick={toggleAllParticipants}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              {participantIds.length === participants.length ? t('deselectAll') : t('selectAll')}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {participants.map(user => (
              <label key={user.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={participantIds.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setParticipantIds(prev => [...prev, user.id]);
                    } else {
                      setParticipantIds(prev => prev.filter(id => id !== user.id));
                    }
                  }}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
            isFormValid && !isSubmitting
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              {t('addExpense')}...
            </span>
          ) : (
            `💸 ${t('addExpense')}`
          )}
        </button>
      </form>
    </div>
  );
}
