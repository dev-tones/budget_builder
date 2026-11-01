import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';
import { JwtInfrastructureModule } from '../common/jwt/jwt-infrastructure/jwt-infrastructure.module';
@Module({
  imports: [UsersModule, JwtInfrastructureModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
