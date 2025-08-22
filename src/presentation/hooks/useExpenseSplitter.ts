'use client';

import { useState } from 'react';
import { Friend, Settlement, ExpenseSplitter, ExpenseSummary } from '@/domain/ExpenseSplitter';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useExpenseSplitter = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendAmount, setNewFriendAmount] = useState('');

  const validateFriend = (name: string, amount: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!name.trim()) {
      errors.push('Name is required');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    } else if (friendExists(name.trim())) {
      errors.push('Friend already exists');
    }
    
    if (!amount.trim()) {
      errors.push('Amount is required');
    } else if (isNaN(Number(amount))) {
      errors.push('Amount must be a valid number');
    } else if (Number(amount) < 0) {
      errors.push('Amount cannot be negative');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const friendExists = (name: string): boolean => {
    return friends.some(friend => 
      friend.name.toLowerCase() === name.toLowerCase()
    );
  };

  const addFriend = (): boolean => {
    const validation = validateFriend(newFriendName, newFriendAmount);
    if (!validation.isValid) return false;

    const amount = roundAmount(Number(newFriendAmount));
    
    const newFriend: Friend = {
      id: generateId(),
      name: newFriendName.trim(),
      totalPaid: amount
    };

    setFriends(prev => [...prev, newFriend]);
    clearForm();
    return true;
  };

  const removeFriend = (id: string): void => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
  };

  const updateFriend = (id: string, name: string, amount: number): void => {
    setFriends(prev => prev.map(friend => 
      friend.id === id 
        ? { ...friend, name: name.trim(), totalPaid: roundAmount(amount) }
        : friend
    ));
  };

  const clearAll = (): void => {
    setFriends([]);
    clearForm();
  };

  const clearForm = (): void => {
    setNewFriendName('');
    setNewFriendAmount('');
  };

  const generateId = (): string => {
    return Date.now().toString();
  };

  const roundAmount = (amount: number): number => {
    return Math.round(amount * 100) / 100;
  };

  const settlements: Settlement[] = ExpenseSplitter.calculateSettlements(friends);
  const summary: ExpenseSummary = ExpenseSplitter.calculateSummary(friends);

  return {
    friends,
    newFriendName,
    setNewFriendName,
    newFriendAmount,
    setNewFriendAmount,
    addFriend,
    removeFriend,
    updateFriend,
    clearAll,
    settlements,
    summary,
    validateFriend
  };
};
