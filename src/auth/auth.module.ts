import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepositoryProvider } from './users.repository.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'abcdSecretKey',
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([User])],
  exports: [UsersRepositoryProvider, JwtStrategy, PassportModule],
  providers: [AuthService, UsersRepositoryProvider, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
