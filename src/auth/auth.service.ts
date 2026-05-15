import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from './users.repository.provider';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { UsersRepositoryType } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryType,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentials);
  }
}
