import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Book,
  User,
  Doctor,
  Callback,
  Speciality
} from '../common/db/interfaces';
@Injectable()
export class StatsService {
  constructor(
    @InjectModel('Callback') private callbackModel: Model<Callback>,
    @InjectModel('Book') private bookModel: Model<Book>,
    @InjectModel('Doctor') private doctorModel: Model<Doctor>,
    @InjectModel('Speciality') private specialityModel: Model<Speciality>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  async getSpecsByPeriod(gte: Date, lte: Date) {
    return this.specialityModel.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'uid',
          foreignField: 'speciality',
          as: 'books'
        }
      },
      {
        $project: {
          title: 1,
          books: {
            $filter: {
              input: '$books',
              as: 'item',
              cond: {
                $and: [
                  { $gte: ['$$item.acceptanceDate', new Date(gte)] },
                  { $lte: ['$$item.acceptanceDate', new Date(lte)] }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          title: 1,
          books: {
            $size: '$books'
          }
        }
      },
      {
        $sort: {
          books: -1
        }
      }
    ]);
  }

  async getVisitsByPeriod(gte: Date, lte: Date) {
    return this.doctorModel.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'doctorId',
          as: 'books'
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
        $project: {
          fullname: {
            $concat: ['$surname', ' ', '$name', ' ', '$patronymics']
          },
          books: {
            $filter: {
              input: '$books',
              as: 'item',
              cond: {
                $and: [
                  { $gte: ['$$item.acceptanceDate', new Date(gte)] },
                  { $lte: ['$$item.acceptanceDate', new Date(lte)] }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          fullname: 1,
          books: {
            $size: '$books'
          }
        }
      },
      {
        $sort: {
          books: -1
        }
      }
    ]);
  }
}
