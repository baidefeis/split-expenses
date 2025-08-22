'use client';

import { useState, useEffect } from 'react';
import { ActivityEntity } from '@/domain/entities/Activity';
import { ExpenseEntity, ExpenseCategory } from '@/domain/entities/Expense';
import { UserEntity } from '@/domain/entities/User';
import { LocalStorageActivityRepository } from '@/infrastructure/repositories/LocalStorageActivityRepository';
import { LocalStorageExpenseRepository } from '@/infrastructure/repositories/LocalStorageExpenseRepository';
import { LocalStorageUserRepository } from '@/infrastructure/repositories/LocalStorageUserRepository';
import { CreateActivityUseCase } from '@/application/use-cases/CreateActivityUseCase';
import { CreateExpenseUseCase } from '@/application/use-cases/CreateExpenseUseCase';
import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { DeleteActivityUseCase } from '@/application/use-cases/DeleteActivityUseCase';
import { DeleteExpenseUseCase } from '@/application/use-cases/DeleteExpenseUseCase';
import { DeleteUserUseCase } from '@/application/use-cases/DeleteUserUseCase';

interface ActivityBalance {
  userId: string;
  userName: string;
  totalPaid: number;
  totalOwed: number;
  balance: number;
}

interface Settlement {
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
}

export const useExpenseManager = () => {
  const [activities, setActivities] = useState<ActivityEntity[]>([]);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activityRepository = new LocalStorageActivityRepository();
  const expenseRepository = new LocalStorageExpenseRepository();
  const userRepository = new LocalStorageUserRepository();

  const createActivityUseCase = new CreateActivityUseCase(activityRepository);
  const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const deleteActivityUseCase = new DeleteActivityUseCase(activityRepository, expenseRepository);
  const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository, expenseRepository, activityRepository);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [activitiesData, usersData, expensesData] = await Promise.all([
        activityRepository.findAll(),
        userRepository.findAll(),
        expenseRepository.findAll()
      ]);

      setActivities(activitiesData);
      setUsers(usersData);
      setExpenses(expensesData);
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  const createActivity = async (name: string, description?: string): Promise<{ success: boolean; message?: string; wasCreated?: boolean }> => {
    try {
      const result = await createActivityUseCase.execute({
        name,
        description
      });
      
      if (result.wasCreated) {
        setActivities(prev => [...prev, result.activity]);
        setSelectedActivity(result.activity);
        return { success: true, wasCreated: true };
      } else {
        setSelectedActivity(result.activity);
        return { 
          success: false, 
          wasCreated: false,
          message: result.message || `Activity "${name}" already exists` 
        };
      }
    } catch (error) {
      return { success: false, message: 'Failed to create activity' };
    }
  };

  const addUserToActivity = async (userName: string): Promise<UserEntity | null> => {
    if (!selectedActivity) return null;

    try {
      let user = await userRepository.findByName(userName);
      
      if (!user) {
        const userResponse = await createUserUseCase.execute({
          name: userName
        });
        
        if (!userResponse.success || !userResponse.user) {
          return null;
        }
        
        user = userResponse.user;
        setUsers(prev => [...prev, user!]);
      }

      if (selectedActivity.hasParticipant(user.id)) {
        return user;
      }

      const updatedActivity = selectedActivity.addParticipant(user.id);
      await activityRepository.update(updatedActivity);
      
      setActivities(prev => prev.map(a => 
        a.id === updatedActivity.id ? updatedActivity : a
      ));
      setSelectedActivity(updatedActivity);
      
      return user;
    } catch (error) {
      return null;
    }
  };

  const createExpense = async (params: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    paidById: string;
    participantIds: string[];
  }): Promise<boolean> => {
    if (!selectedActivity) return false;

    try {
      const expenseResponse = await createExpenseUseCase.execute({
        ...params,
        activityId: selectedActivity.id
      });

      if (!expenseResponse.success || !expenseResponse.expense) {
        return false;
      }

      setExpenses(prev => [...prev, expenseResponse.expense!]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getActivityExpenses = (activityId: string): ExpenseEntity[] => {
    return expenses.filter(expense => expense.activityId === activityId);
  };

  const calculateActivityBalances = (activityId: string): ActivityBalance[] => {
    const activityExpenses = getActivityExpenses(activityId);
    const activity = activities.find(a => a.id === activityId);
    
    if (!activity) return [];

    const balanceMap = new Map<string, { totalPaid: number; totalOwed: number }>();

    activity.participants.forEach(participantId => {
      balanceMap.set(participantId, { totalPaid: 0, totalOwed: 0 });
    });

    activityExpenses.forEach(expense => {
      const amountPerParticipant = expense.getAmountPerParticipant();
      
      const payerBalance = balanceMap.get(expense.paidById);
      if (payerBalance) {
        payerBalance.totalPaid += expense.amount;
      }

      expense.participantIds.forEach(participantId => {
        const participantBalance = balanceMap.get(participantId);
        if (participantBalance) {
          participantBalance.totalOwed += amountPerParticipant;
        }
      });
    });

    return Array.from(balanceMap.entries()).map(([userId, { totalPaid, totalOwed }]) => {
      const user = users.find(u => u.id === userId);
      return {
        userId,
        userName: user?.name || 'Unknown User',
        totalPaid,
        totalOwed,
        balance: totalPaid - totalOwed
      };
    });
  };

  const calculateSettlements = (balances: ActivityBalance[]): Settlement[] => {
    const settlements: Settlement[] = [];
    const creditors = balances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);
    const debtors = balances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);

    let creditorIndex = 0;
    let debtorIndex = 0;

    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];
      const settlementAmount = Math.min(creditor.balance, Math.abs(debtor.balance));

      if (settlementAmount > 0.01) {
        settlements.push({
          fromUserId: debtor.userId,
          fromUserName: debtor.userName,
          toUserId: creditor.userId,
          toUserName: creditor.userName,
          amount: Math.round(settlementAmount * 100) / 100
        });

        creditor.balance -= settlementAmount;
        debtor.balance += settlementAmount;
      }

      if (Math.abs(creditor.balance) < 0.01) {
        creditorIndex++;
      }
      if (Math.abs(debtor.balance) < 0.01) {
        debtorIndex++;
      }
    }

    return settlements;
  };

  const resetAllData = async (): Promise<boolean> => {
    try {
      localStorage.removeItem('splitExpenses_activities');
      localStorage.removeItem('splitExpenses_expenses'); 
      localStorage.removeItem('splitExpenses_users');
      
      setActivities([]);
      setUsers([]);
      setExpenses([]);
      setSelectedActivity(null);
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteActivity = async (activityId: string): Promise<boolean> => {
    try {
      const response = await deleteActivityUseCase.execute({ activityId });
      
      if (!response.success) {
        return false;
      }

      setActivities(prev => prev.filter(a => a.id !== activityId));
      setExpenses(prev => prev.filter(e => e.activityId !== activityId));
      
      if (selectedActivity?.id === activityId) {
        setSelectedActivity(null);
      }
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteExpense = async (expenseId: string): Promise<boolean> => {
    try {
      const response = await deleteExpenseUseCase.execute({ expenseId });
      
      if (!response.success) {
        return false;
      }

      setExpenses(prev => prev.filter(e => e.id !== expenseId));
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteUser = async (userId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await deleteUserUseCase.execute(userId);
      
      if (!response.success) {
        return response;
      }

      setUsers(prev => prev.filter(u => u.id !== userId));
      const updatedActivities = await activityRepository.findAll();
      setActivities(updatedActivities);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete user' };
    }
  };

  return {
    activities,
    users,
    expenses,
    selectedActivity,
    isLoading,
    createActivity,
    addUserToActivity,
    createExpense,
    deleteActivity,
    deleteExpense,
    deleteUser,
    resetAllData,
    setSelectedActivity,
    getActivityExpenses,
    calculateActivityBalances,
    calculateSettlements
  };
};
