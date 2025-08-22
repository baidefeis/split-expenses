'use client';

import React from 'react';
import { Settlement, ExpenseSummary } from '@/domain/ExpenseSplitter';

interface ResultsProps {
  settlements: Settlement[];
  summary: ExpenseSummary;
}

export const Results: React.FC<ResultsProps> = ({ settlements, summary }) => {
  if (summary.numberOfFriends === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <SummarySection summary={summary} />
      <SettlementsSection settlements={settlements} />
    </div>
  );
};

interface SummarySectionProps {
  summary: ExpenseSummary;
}

function SummarySection({ summary }: SummarySectionProps) {
  const summaryItems = [
    {
      value: `€${summary.totalExpenses.toFixed(2)}`,
      label: 'Total Spent',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      value: `€${summary.averagePerPerson.toFixed(2)}`,
      label: 'Per Person',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      value: summary.numberOfFriends.toString(),
      label: 'Friends',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryItems.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

interface SummaryCardProps {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

function SummaryCard({ value, label, bgColor, textColor }: SummaryCardProps) {
  return (
    <div className={`text-center p-4 ${bgColor} rounded-lg`}>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
      <div className={`text-sm ${textColor}`}>{label}</div>
    </div>
  );
}

interface SettlementsSectionProps {
  settlements: Settlement[];
}

function SettlementsSection({ settlements }: SettlementsSectionProps) {
  const hasSettlements = settlements.length > 0;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Who Owes Money to Whom
      </h2>
      
      {hasSettlements ? (
        <SettlementsList settlements={settlements} />
      ) : (
        <BalancedState />
      )}
    </div>
  );
}

interface SettlementsListProps {
  settlements: Settlement[];
}

function SettlementsList({ settlements }: SettlementsListProps) {
  return (
    <div className="space-y-3">
      {settlements.map((settlement, index) => (
        <SettlementItem key={index} settlement={settlement} />
      ))}
    </div>
  );
}

interface SettlementItemProps {
  settlement: Settlement;
}

function SettlementItem({ settlement }: SettlementItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          <span className="text-red-600">{settlement.from}</span>
          {' → '}
          <span className="text-green-600">{settlement.to}</span>
        </div>
        <div className="text-sm text-gray-600">
          {settlement.from} should send €{settlement.amount.toFixed(2)} to {settlement.to}
        </div>
      </div>
      <div className="text-xl font-bold text-yellow-600">
        €{settlement.amount.toFixed(2)}
      </div>
    </div>
  );
}

function BalancedState() {
  return (
    <div className="text-center text-green-600 py-8">
      <div className="text-4xl mb-2">🎉</div>
      <div className="text-lg font-medium">Everyone is balanced!</div>
      <div className="text-sm">No transfers needed.</div>
    </div>
  );
}
