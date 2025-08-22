export interface Activity {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly participants: string[];
}

export class ActivityEntity implements Activity {
  private static readonly MIN_NAME_LENGTH = 2;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date = new Date(),
    public readonly participants: string[] = [],
    public readonly description?: string
  ) {
    this.validateName(name);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < ActivityEntity.MIN_NAME_LENGTH) {
      throw new Error('Activity name must have at least 2 characters');
    }
  }

  public addParticipant(participantId: string): ActivityEntity {
    if (this.participants.includes(participantId)) {
      return this;
    }

    return new ActivityEntity(
      this.id,
      this.name,
      this.createdAt,
      [...this.participants, participantId],
      this.description
    );
  }

  public removeParticipant(participantId: string): ActivityEntity {
    return new ActivityEntity(
      this.id,
      this.name,
      this.createdAt,
      this.participants.filter(id => id !== participantId),
      this.description
    );
  }

  public hasParticipant(participantId: string): boolean {
    return this.participants.includes(participantId);
  }

  public equals(other: Activity): boolean {
    return this.id === other.id;
  }
}
