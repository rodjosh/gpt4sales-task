import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ISBN: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string; // 'in stock' | 'out of stock'
}
