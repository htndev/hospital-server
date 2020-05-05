import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../common/db/interfaces';
import { UpdateBookDto } from '../dto/book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async addBook(bookItem: any) {
    await this.bookModel.create(bookItem);
  }

  async updateBook({ id, acceptanceDate, comment }: UpdateBookDto) {
    await this.bookModel.updateOne({ _id: id }, { acceptanceDate, comment });
  }

  async getBooks() {
    return this.bookModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'patientPhone',
          foreignField: 'phone',
          as: 'patient'
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      {
        $lookup: {
          from: 'specialities',
          localField: 'speciality',
          foreignField: 'uid',
          as: 'speciality'
        }
      },
      {
        $unwind: {
          path: '$patient'
        }
      },
      {
        $unwind: {
          path: '$doctor'
        }
      },
      {
        $unwind: {
          path: '$speciality'
        }
      },
      {
        $match: {
          acceptanceDate: {
            $gte: new Date()
          }
        }
      },
      {
        $sort: {
          acceptanceDate: 1
        }
      },
      {
        $project: {
          comment: 1,
          createdAt: 1,
          acceptanceDate: 1,
          'patient.name': 1,
          'patient.surname': 1,
          'patient.patronymics': 1,
          'patient.phone': 1,
          'doctor._id': 1,
          'doctor.name': 1,
          'doctor.surname': 1,
          'doctor.patronymics': 1,
          'speciality.uid': 1,
          'speciality.title': 1
        }
      }
    ]);
  }

  async deleteBook(id: string) {
    await this.bookModel.deleteOne({ _id: id });
  }
}
