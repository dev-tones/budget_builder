import { Module } from '@nestjs/common';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ExpensesController],
  imports: [TypeOrmModule.forFeature([Expense]), AuthModule],
  providers: [ExpensesService],
})
export class ExpensesModule {}
