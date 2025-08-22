'use client';

import React from 'react';
import { Friend } from '@/domain/ExpenseSplitter';

interface FriendsListProps {
  friends: Friend[];
  onRemove: (id: string) => void;
}

export const FriendsList: React.FC<FriendsListProps> = ({ friends, onRemove }) => {
  if (friends.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Friends and Expenses
      </h2>
      
      <div className="space-y-3">
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            friend={friend}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

function EmptyState() {
  return (
    <div className="card">
      <div className="text-center text-gray-500">
        <p>No friends added yet.</p>
        <p className="text-sm mt-1">Add the first friend and their expense to get started.</p>
      </div>
    </div>
  );
}

interface FriendItemProps {
  friend: Friend;
  onRemove: (id: string) => void;
}

function FriendItem({ friend, onRemove }: FriendItemProps) {
  const handleRemove = () => onRemove(friend.id);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{friend.name}</div>
        <div className="text-sm text-gray-600">
          Spent: €{friend.totalPaid.toFixed(2)}
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Remove
      </button>
    </div>
  );
}
