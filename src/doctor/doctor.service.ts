import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from '../common/db/interfaces';

@Injectable()
export class DoctorService {
  constructor(@InjectModel('Doctor') private doctorModel: Model<Doctor>) {}

  async getDoctors() {
    return this.doctorModel.aggregate([
      {
        $lookup: {
          from: 'specialities',
          localField: 'speciality',
          foreignField: 'uid',
          as: 'specialities'
        }
      },
      {
        $project: {
          speciality: 0,
          createdAt: 0,
          updatedAt: 0,
          'specialities.createdAt': 0,
          'specialities.updatedAt': 0,
          'specialities._id': 0
        }
      }
    ]);
  }

  async addDoctor({ name, surname, patronymics, speciality }, image = null) {
    return this.doctorModel.create({ name, surname, patronymics, speciality, image });
  }

  async updateDoctor({ name, surname, patronymics, speciality, _id }, image = null) {
    if(speciality[0].value) {
      speciality[0] = speciality[0].value;
    }
    return image ? this.doctorModel.updateOne({ _id }, { name, surname, patronymics, speciality, image }) : this.doctorModel.updateOne({ _id }, { name, surname, patronymics, speciality });
  }

  async deleteDoctor({ _id }: {_id: string}) {
    await this.doctorModel.deleteOne({ _id });
  }

  async doctorExists({ _id }) {
    const exists = await this.doctorModel.findOne({ _id });
    return Boolean(exists);
  }
}
