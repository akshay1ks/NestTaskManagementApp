import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export const UsersRepositoryProvider = {
  provide: USERS_REPOSITORY,
  inject: [DataSource],
  useFactory: (dataSource: DataSource) => UsersRepository(dataSource),
};
