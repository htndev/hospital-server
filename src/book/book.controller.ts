import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { NewBookDto, UpdateBookDto } from '../dto/book.dto';
import { CallbackService } from '../callback/callback.service';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly callbackService: CallbackService
  ) {}
  @Get()
  async getBooks() {
    return this.bookService.getBooks();
  }

  @Post()
  async addRecord(
    @Body() newBook: NewBookDto
  ) {
    await this.bookService.addBook(newBook);
    await this.callbackService.deleteCallback(newBook.callbackId);
    return {
      status: 200,
      message: 'Запись успешно добавлена.'
    };
  }

  @Put()
  async updateRecord(
    @Body() book: UpdateBookDto
  ) {
    await this.bookService.updateBook(book);
    return {
      status: 200,
      message: 'Данные приема успешно обновлены.'
    };
  }

  @Delete(':id')
  async cancelRecord(
    @Param('id') id: string
  ) {
    await this.bookService.deleteBook(id);
    return {
      status: 200,
      message: 'Прием успешно отменен.'
    };
  }
}
