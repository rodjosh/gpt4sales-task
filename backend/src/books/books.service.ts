import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { CreateBookDto, UpdateBookDto } from 'src/books/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async create(bookData: CreateBookDto): Promise<Book> {
    return this.bookModel.create(bookData);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async update(id: number, updateData: UpdateBookDto): Promise<number> {
    const [affectedCount] = await this.bookModel.update(updateData, {
      where: { id },
    });
    return affectedCount;
  }

  async updateAndGetUpdated(
    id: number,
    updateData: UpdateBookDto,
  ): Promise<Book[]> {
    await this.bookModel.update(updateData, { where: { id } });
    return this.bookModel.findAll({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    if (book) {
      await book.destroy();
    }
  }
}
