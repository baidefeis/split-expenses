'use client';

import { useState } from 'react';
import { useExpenseManager } from '@/presentation/hooks/useExpenseManager';
import { QuickExpenseForm } from '@/presentation/components/QuickExpenseForm';
import { ExpenseSummary } from '@/presentation/components/ExpenseSummary';
import { useLanguage } from '@/context/LanguageContext';

interface ActivityBalance {
  userId: string;
  userName: string;
  totalPaid: number;
  totalOwed: number;
  balance: number;
}

export default function ExpenseManagerDemo() {
  const { t } = useLanguage();
  const {
    activities,
    selectedActivity,
    users,
    expenses,
    createActivity,
    setSelectedActivity,
    addUserToActivity,
    createExpense,
    deleteActivity,
    deleteExpense,
    deleteUser,
    resetAllData,
    calculateActivityBalances,
    calculateSettlements
  } = useExpenseManager();

  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handleCreateActivity = async () => {
    if (activityName.trim()) {
      setValidationMessage('');
      const result = await createActivity(activityName.trim(), activityDescription.trim());
      
      if (result.success) {
        setActivityName('');
        setActivityDescription('');
        setShowCreateForm(false);
        setValidationMessage('');
      } else if (result.message) {
        setValidationMessage(t('activityExists'));
      }
    }
  };

  const handleAddUser = async () => {
    if (userName.trim()) {
      const user = await addUserToActivity(userName.trim());
      if (user) {
        setUserName('');
      }
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (confirm(`${t('deleteConfirm')} ${userName}? ${t('deleteUndone')}`)) {
      const result = await deleteUser(userId);
      if (!result.success && result.message) {
        alert(result.message);
      }
    }
  };

  const activityParticipants = selectedActivity 
    ? users.filter(user => selectedActivity.participants.includes(user.id))
    : [];

  const activityExpenses = selectedActivity 
    ? expenses.filter(expense => expense.activityId === selectedActivity.id)
    : [];

  const balances = selectedActivity ? calculateActivityBalances(selectedActivity.id) : [];
  const settlements = selectedActivity && balances.length > 0 ? calculateSettlements(balances) : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t('expenseManager')}</h1>
        <button
          onClick={async () => {
            if (confirm(t('resetConfirm'))) {
              await resetAllData();
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm mb-4"
        >
          {t('resetData')}
        </button>
      </div>
      
      {activities.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('startFirstActivity')}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t('activityNamePlaceholder')}
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder={t('descriptionPlaceholder')}
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              onClick={handleCreateActivity}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all"
            >
              {t('createActivity')}
            </button>
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">
              {selectedActivity ? `${t('current')}: ${selectedActivity.name}` : t('selectActivity')}
            </h3>
            {!selectedActivity && !showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              >
                {t('newActivity')}
              </button>
            )}
            {showCreateForm && (
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setActivityName('');
                  setActivityDescription('');
                  setValidationMessage('');
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
              >
                {t('cancel')}
              </button>
            )}
          </div>
          
          {showCreateForm && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('activityNamePlaceholder')}
                  value={activityName}
                  onChange={(e) => {
                    setActivityName(e.target.value);
                    if (validationMessage) setValidationMessage('');
                  }}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder={t('descriptionPlaceholder')}
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                
                {validationMessage && (
                  <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                    {validationMessage}
                  </div>
                )}
                
                <button
                  onClick={handleCreateActivity}
                  disabled={!activityName.trim()}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {t('createActivity')}
                </button>
              </div>
            </div>
          )}
          
          {!selectedActivity ? (
            <div className="grid gap-2">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded border bg-gray-50 hover:bg-gray-100"
                >
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="flex-1 text-left"
                  >
                    <div className="font-medium">{activity.name}</div>
                    {activity.description && (
                      <div className="text-sm text-gray-600">{activity.description}</div>
                    )}
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete "${activity.name}"? This will delete all expenses too.`)) {
                        await deleteActivity(activity.id);
                      }
                    }}
                    className="ml-3 text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span className="text-blue-800 font-medium">{selectedActivity.name}</span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {t('changeActivity')}
              </button>
            </div>
          )}
        </div>
      )}

      {selectedActivity && activityParticipants.length > 1 && (
        <QuickExpenseForm
          participants={activityParticipants}
          onSubmit={createExpense}
        />
      )}

      {selectedActivity && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{t('participants')} ({activityParticipants.length})</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder={t('addParticipantPlaceholder')}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
              />
              <button
                onClick={handleAddUser}
                className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
              >
                {t('add')}
              </button>
            </div>
          </div>
          
          {activityParticipants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activityParticipants.map(user => (
                <div 
                  key={user.id} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group hover:bg-blue-200 transition-colors"
                >
                  <span className="mr-2">{user.name}</span>
                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1 transition-colors"
                    title={`Delete ${user.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {activityParticipants.length <= 1 && (
            <p className="text-sm text-gray-500 mt-2">
              {t('addTwoParticipants')}
            </p>
          )}
        </div>
      )}

      {activityExpenses.length > 0 && (
        <ExpenseSummary 
          expenses={activityExpenses}
          users={users}
          onDeleteExpense={deleteExpense}
        />
      )}

      {balances.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t('balances')}</h2>
          <div className="space-y-2">
            {balances.map(balance => (
              <div key={balance.userId} className="flex justify-between items-center p-2 border rounded">
                <span className="font-medium">{balance.userName}</span>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {t('totalPaid')}: €{balance.totalPaid.toFixed(2)} | {t('totalOwed')}: €{balance.totalOwed.toFixed(2)}
                  </div>
                  <div className={`font-medium ${
                    balance.balance > 0 ? 'text-green-600' : balance.balance < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {balance.balance > 0 ? '+' : ''}€{balance.balance.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {settlements.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t('settlements')}</h2>
          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg">💰</div>
                  <div>
                    <div className="font-medium text-gray-900">
                      <span className="text-red-600">{settlement.fromUserName}</span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="text-green-600">{settlement.toUserName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {settlement.fromUserName} {t('owes')} €{settlement.amount.toFixed(2)} {t('to')} {settlement.toUserName}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    €{settlement.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-700">
              {t('transfersCompleted')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
