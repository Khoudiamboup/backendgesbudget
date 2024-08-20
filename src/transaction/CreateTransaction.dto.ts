import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  category: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  date: Date;

  @IsEnum(['income', 'expense']);
  type: 'income' | 'expense';
}