import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Callback } from '../common/db/interfaces';
import { NewCallbackDto } from '../dto/callback.dto';

@Injectable()
export class CallbackService {
  constructor(@InjectModel('Callback') private callbackModel: Model<Callback>) {}

  async getAllCallbacks() {
    const callbacks = await this.callbackModel.aggregate([
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
          from: 'specialities',
          localField: 'speciality',
          foreignField: 'uid',
          as: 'speciality'
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
        $unwind: {
          path: '$patient'
        }
      },
      {
        $unwind: {
          path: '$speciality'
        }
      },
      {
        $unwind: {
          path: '$doctor'
        }
      },
      {
        $project: {
          createdAt: 1,
          doctorId: 1,
          'patient.name': 1,
          'patient.surname': 1,
          'patient.patronymics': 1,
          'speciality.title': 1,
          'speciality.uid': 1,
          patientPhone: 1,
          'doctor.name': 1,
          'doctor.surname': 1,
          'doctor.patronymics': 1
        }
      },
      {
        $sort: {
          createdAt: 1
        }
      }
    ]) || [];
    return callbacks;
  }

  async createNewCallback(callback: NewCallbackDto) {
    await this.callbackModel.create(callback);
  }

  async deleteCallback(id: string) {
    await this.callbackModel.deleteOne({ _id: id });
  }
}
