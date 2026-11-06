import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtInfrastructureModule } from '../common/jwt/jwt-infrastructure/jwt-infrastructure.module';
@Module({
  imports: [UsersModule, JwtInfrastructureModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
