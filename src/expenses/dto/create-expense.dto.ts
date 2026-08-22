import { ApiProperty } from '@nestjs/swagger';
export class CreateExpenseDto {
  @ApiProperty({
    example: 'Electric bill',
    description: 'Name of the expense',
  })
  name!: string;
  @ApiProperty({
    example: 150.5,
    description: 'Expense amount in dollars',
  })
  amount!: number;
}
