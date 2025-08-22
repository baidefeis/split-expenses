export interface Friend {
  id: string;
  name: string;
  totalPaid: number;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export interface ExpenseSummary {
  totalExpenses: number;
  averagePerPerson: number;
  numberOfFriends: number;
}

interface Balance {
  name: string;
  balance: number;
}

export class ExpenseSplitter {
  private static readonly PRECISION_THRESHOLD = 0.01;

  static calculateSettlements(friends: Friend[]): Settlement[] {
    if (friends.length === 0) return [];

    const balances = this.calculateBalances(friends);
    const creditors = this.getCreditors(balances);
    const debtors = this.getDebtors(balances);

    return this.optimizeSettlements(creditors, debtors);
  }

  static calculateSummary(friends: Friend[]): ExpenseSummary {
    const totalExpenses = this.getTotalExpenses(friends);
    const averagePerPerson = friends.length > 0 ? totalExpenses / friends.length : 0;
    
    return {
      totalExpenses: this.roundAmount(totalExpenses),
      averagePerPerson: this.roundAmount(averagePerPerson),
      numberOfFriends: friends.length
    };
  }

  private static calculateBalances(friends: Friend[]): Balance[] {
    const totalExpenses = this.getTotalExpenses(friends);
    const averagePerPerson = totalExpenses / friends.length;
    
    return friends.map(friend => ({
      name: friend.name,
      balance: friend.totalPaid - averagePerPerson
    }));
  }

  private static getCreditors(balances: Balance[]): Balance[] {
    return balances
      .filter(balance => balance.balance > this.PRECISION_THRESHOLD)
      .sort((a, b) => b.balance - a.balance);
  }

  private static getDebtors(balances: Balance[]): Balance[] {
    return balances
      .filter(balance => balance.balance < -this.PRECISION_THRESHOLD)
      .sort((a, b) => a.balance - b.balance);
  }

  private static optimizeSettlements(creditors: Balance[], debtors: Balance[]): Settlement[] {
    const settlements: Settlement[] = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];
      const settlementAmount = Math.min(creditor.balance, Math.abs(debtor.balance));

      if (settlementAmount > this.PRECISION_THRESHOLD) {
        settlements.push({
          from: debtor.name,
          to: creditor.name,
          amount: this.roundAmount(settlementAmount)
        });

        creditor.balance -= settlementAmount;
        debtor.balance += settlementAmount;
      }

      if (Math.abs(creditor.balance) < this.PRECISION_THRESHOLD) {
        creditorIndex++;
      }
      if (Math.abs(debtor.balance) < this.PRECISION_THRESHOLD) {
        debtorIndex++;
      }
    }

    return settlements;
  }

  private static getTotalExpenses(friends: Friend[]): number {
    return friends.reduce((sum, friend) => sum + friend.totalPaid, 0);
  }

  private static roundAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}
