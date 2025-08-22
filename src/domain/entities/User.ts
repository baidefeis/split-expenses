export interface User {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
}

export class UserEntity implements User {
  private static readonly MIN_NAME_LENGTH = 2;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date = new Date()
  ) {
    this.validateName(name);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < UserEntity.MIN_NAME_LENGTH) {
      throw new Error('User name must have at least 2 characters');
    }
  }

  public equals(other: User): boolean {
    return this.id === other.id;
  }
}
