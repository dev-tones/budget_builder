import { Module } from '@nestjs/common';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExpensesController],
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesService],
})
export class ExpensesModule {}
