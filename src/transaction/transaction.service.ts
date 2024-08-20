import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './CreateTransaction.dto';
import { UpdateTransactionDto } from './UpdateTransaction.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findSummary(): Promise<{ totalIncome: number; totalExpenses: number; remainingBudget: number }> {
    const { totalIncome, totalExpenses } = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select(
        'SUM(CASE WHEN transaction.type = :income THEN transaction.amount ELSE 0 END) AS totalIncome',
        'SUM(CASE WHEN transaction.type = :expense THEN transaction.amount ELSE 0 END) AS totalExpenses',
      )
      .setParameters({ income: 'income', expense: 'expense' })
      .getRawOne();

    const remainingBudget = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, remainingBudget };
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }
}