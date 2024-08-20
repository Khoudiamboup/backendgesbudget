import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  type: 'income' | 'expense';
}