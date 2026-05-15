import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export const UsersRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async createUser(
      this: Repository<User>,
      authCredentials: AuthCredentialsDto,
    ): Promise<void> {
      const { username, password } = authCredentials;
      const user = this.create({ username, password });
      await this.save(user);
    },
  });

export type UsersRepositoryType = ReturnType<typeof UsersRepository>;
