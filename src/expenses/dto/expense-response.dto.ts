import { ApiProperty } from '@nestjs/swagger';
export class ExpenseResponseDto {
  @ApiProperty({
    description: 'Id of expense',
    example: 1,
  })
  id!: number;
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
  @ApiProperty({
    description: 'Date the expense was created',
    example: '2026-08-20T21:30:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Date the expense was last updated',
    example: '2026-08-20T21:45:00.000Z',
  })
  updatedAt!: string;
}
