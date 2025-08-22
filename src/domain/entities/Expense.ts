export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  UTILITIES = 'utilities',
  OTHER = 'other'
}

export interface Expense {
  readonly id: string;
  readonly description: string;
  readonly amount: number;
  readonly category: ExpenseCategory;
  readonly paidById: string;
  readonly activityId: string;
  readonly participantIds: string[];
  readonly createdAt: Date;
}

export class ExpenseEntity implements Expense {
  private static readonly MIN_DESCRIPTION_LENGTH = 2;

  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly category: ExpenseCategory,
    public readonly paidById: string,
    public readonly activityId: string,
    public readonly participantIds: string[],
    public readonly createdAt: Date = new Date()
  ) {
    this.validateDescription(description);
    this.validateAmount(amount);
    this.validateParticipants(participantIds);
    this.validatePayer(paidById, participantIds);
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length < ExpenseEntity.MIN_DESCRIPTION_LENGTH) {
      throw new Error('Expense description must have at least 2 characters');
    }
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Expense amount must be greater than 0');
    }
    if (Number.isNaN(amount) || !Number.isFinite(amount)) {
      throw new Error('Expense amount must be a valid number');
    }
  }

  private validateParticipants(participantIds: string[]): void {
    if (participantIds.length === 0) {
      throw new Error('Expense must have at least one participant');
    }
    
    const uniqueParticipants = new Set(participantIds);
    if (uniqueParticipants.size !== participantIds.length) {
      throw new Error('Duplicate participants are not allowed');
    }
  }

  private validatePayer(paidById: string, participantIds: string[]): void {
    if (!participantIds.includes(paidById)) {
      throw new Error('Payer must be one of the participants');
    }
  }

  public getAmountPerParticipant(): number {
    return this.amount / this.participantIds.length;
  }

  public getDebtForParticipant(participantId: string): number {
    if (!this.participantIds.includes(participantId)) {
      return 0;
    }
    
    if (participantId === this.paidById) {
      return this.amount - this.getAmountPerParticipant();
    }
    
    return -this.getAmountPerParticipant();
  }

  public belongsToActivity(activityId: string): boolean {
    return this.activityId === activityId;
  }
}
