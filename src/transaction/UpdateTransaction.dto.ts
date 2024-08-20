import { IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  category: string;

  @IsNumber()
  amount: number;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';
}
