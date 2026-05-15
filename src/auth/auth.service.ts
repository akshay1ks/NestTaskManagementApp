import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USERS_REPOSITORY } from './users.repository.provider';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { UsersRepositoryType } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryType,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // In a real application, you would return a JWT token here
      return 'Sign in successful';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
