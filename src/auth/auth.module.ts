import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepositoryProvider } from './users.repository.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersRepositoryProvider],
  providers: [AuthService, UsersRepositoryProvider],
  controllers: [AuthController],
})
export class AuthModule {}
