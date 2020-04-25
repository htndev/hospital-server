import { Module }          from '@nestjs/common';
import { BookService }     from './book.service';
import { BookController }  from './book.controller';
import { MongooseModule }  from '@nestjs/mongoose';
import BookSchema          from '../common/db/schemas/book.schema';
import CallbackSchema      from '../common/db/schemas/callback.schema';
import { CallbackService } from '../callback/callback.service';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Book', schema: BookSchema }, { name: 'Callback', schema: CallbackSchema } ])
  ],
  providers: [ BookService, CallbackService ],
  controllers: [ BookController ]
})
export class BookModule {}
