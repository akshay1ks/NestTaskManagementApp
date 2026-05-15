// import { EntityRepository, Repository } from 'typeorm';
// import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// @EntityRepository(User)
// export class UsersRepository extends Repository<User> {
//   //   async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
//   //     const { username, password } = authCredentials;
//   //     const user = this.create({ username, password });
//   //     await this.save(user);
//   //   }
// }
import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const UsersRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCredentials;
      const user = this.create({ username, password });
      await this.save(user);
    },
  });

export type UsersRepositoryType = ReturnType<typeof UsersRepository>;
