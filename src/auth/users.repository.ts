import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export const UsersRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async createUser(
      this: Repository<User>,
      authCredentials: AuthCredentialsDto,
    ): Promise<void> {
      const { username, password } = authCredentials;
      const user = this.create({ username, password });
      try {
        await this.save(user);
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException('Failed to create user');
        }
      }
    },
  });

export type UsersRepositoryType = ReturnType<typeof UsersRepository>;
