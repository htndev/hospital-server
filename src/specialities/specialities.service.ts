import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, Speciality } from '../common/db/interfaces';
import * as _ from 'lodash';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectModel('Speciality') private specialityModel: Model<Speciality>,
    @InjectModel('Doctor') private doctorModel: Model<Doctor>
  ) {}

  async getAllSpecialities(doctorsRequired: boolean | unknown) {
    switch (doctorsRequired) {
      case 'amount':
        const specialities = await this.specialityModel.find({}, {
          title: 1,
          _id: 0,
          uid: 1
        });
        const doctors = await this.doctorModel.find({}, {
          _id: 0,
          speciality: 1
        });
        const specialitiesUids: [] = this.flat(doctors.map(doc => doc.speciality));
        const uniqueSpecUids = _.uniq([ ...specialitiesUids ]);
        const obj: any = {};

        uniqueSpecUids.map(uid => {
          obj[uid] = specialitiesUids.filter(id => id === uid).length;
        });

        const filteredSpecs = specialities.map((spec: any) => ({ ...spec._doc, amount: obj[spec.uid] || 0 }));

        return filteredSpecs;
      case 'object':
        return this.specialityModel.aggregate([
          {
            $lookup: {
              from: 'doctors',
              localField: 'uid',
              foreignField: 'speciality',
              as: 'doctors'
            }
          },
          {
            $project: {
              _id: 0,
              createdAt: 0,
              updatedAt: 0,
              'doctors.speciality': 0,
              'doctors.createdAt': 0,
              'doctors.updatedAt': 0
            }
          }
        ]);
      default:
        return this.specialityModel.find({}, {
          createdAt: 0,
          updatedAt: 0,
          _id: 0
        });
    }
  }

  async addSpeciality({ title }: {title: string}): Promise<object> {
    if(await this.specialityExists({ title })) {
      throw new ConflictException('Такая специальность уже есть.');
    }
    return await this.specialityModel.create({ title });
  }

  async specialityExists({ title }: {title: string}): Promise<boolean> {
    const exists = await this.specialityModel.findOne({ title }, {
      _id: 0
    });
    return Boolean(exists);
  }

  async specialityExistsByUid({ uid }: {uid: string}): Promise<boolean> {
    const exists = await this.specialityModel.findOne({ uid }, {
      _id: 0
    });
    return Boolean(exists);
  }

  async updateSpeciality({ title, uid }: {title: string; uid: string}) {
    await this.specialityModel.updateOne({ uid }, { title });
  }

  async deleteSpeciality({ uid }) {
    await this.specialityModel.deleteOne({ uid });

    await this.specialityModel.updateMany({}, {
      $pull: {
        specialities: {
          $in: [ uid ]
        }
      }
    });
  }

  private flat(array): [] {
    return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flat(val)) : acc.concat(val), []);
  }
}
