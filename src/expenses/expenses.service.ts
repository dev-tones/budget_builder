import { Injectable } from '@nestjs/common';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseResponseDto } from './dto/expense-response.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}
  async create(
    createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    const expense = this.expenseRepository.create(createExpenseDto);
    const savedExpense = await this.expenseRepository.save(expense);
    return {
      id: savedExpense.id,
      name: savedExpense.name,
      amount: savedExpense.amount,
      createdAt: savedExpense.createdAt.toISOString(),
      updatedAt: savedExpense.updatedAt.toISOString(),
    };
  }

  async findAll(): Promise<ExpenseResponseDto[]> {
    const expenseResponse: Expense[] = await this.expenseRepository.find();
    return expenseResponse.map((expense) => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    }));
  }

  async findOne(id: number): Promise<ExpenseResponseDto | null> {
    const e = await this.expenseRepository.findOneBy({ id });
    if (!e) {
      throw new NotFoundException(`Expense ${id} not found`);
    }
    return {
      id: e.id,
      name: e.name,
      amount: e.amount,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    };
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseResponseDto> {
    const e = await this.expenseRepository.preload({
      id,
      ...updateExpenseDto,
    });
    if (!e) {
      throw new NotFoundException(`Expense ${id} not found`);
    }
    const savedExpense = await this.expenseRepository.save(e);
    return {
      id: savedExpense.id,
      name: savedExpense.name,
      amount: savedExpense.amount,
      createdAt: savedExpense.createdAt.toISOString(),
      updatedAt: savedExpense.updatedAt.toISOString(),
    };
  }

  async remove(id: number): Promise<void> {
    const e = await this.expenseRepository.findOneBy({ id });
    if (!e) {
      throw new NotFoundException(`Expense ${id} not found`);
    }
    await this.expenseRepository.remove(e);
  }
}
