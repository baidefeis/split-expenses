import { UserEntity } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export interface CreateUserRequest {
  name: string;
}

export interface CreateUserResponse {
  success: boolean;
  user?: UserEntity;
  error?: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const existingUser = await this.userRepository.findByName(request.name);
      if (existingUser) {
        return {
          success: true,
          user: existingUser
        };
      }

      const user = new UserEntity(
        this.generateUserId(),
        request.name
      );

      await this.userRepository.save(user);

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
