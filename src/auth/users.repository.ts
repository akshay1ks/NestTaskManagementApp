import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const UsersRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async createUser(
      this: Repository<User>,
      authCredentials: AuthCredentialsDto,
    ): Promise<void> {
      const { username, password } = authCredentials;

      //hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(password, salt);

      const user = this.create({ username, password: hashedPassword });
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
