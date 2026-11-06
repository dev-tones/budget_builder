import { Module } from '@nestjs/common';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtInfrastructureModule } from '../common/jwt/jwt-infrastructure/jwt-infrastructure.module';
import { AuthGuard } from '../auth/auth.guard';
@Module({
  controllers: [ExpensesController],
  imports: [TypeOrmModule.forFeature([Expense]), JwtInfrastructureModule],
  providers: [ExpensesService, AuthGuard],
})
export class ExpensesModule {}
