import { prop, index, pre } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Validator } from '@typegoose/typegoose/lib/types';
import CONSTANTS from '../../constants';
import { SecurityProvider } from '../../providers/security/security';

export type Gender = 'male' | 'female';

const validators: { [key: string]: Validator } = {
  password: {
    validator: (v: string): boolean => CONSTANTS.PASSWORD_PATTERN().test(v),
    message: 'Password should has minimum 6 symbols.'
  }
};

@pre<User>('save', async function(next) {
  await this.validate();
  this.password = await SecurityProvider.cryptPassword(this.password);
  next();
})
@index({ phone: 1 }, { unique: true, background: true })
export default class User {
  constructor({
    phone,
    name,
    surname,
    patronymics,
    gender,
    password
  }: {
    phone?: string;
    name?: string;
    surname?: string;
    patronymics?: string;
    gender?: Gender;
    password?: string;
    regDate?: Date;
  } = {}) {
    this.phone = phone;
    this.name = name;
    this.surname = surname;
    this.patronymics = patronymics;
    this.gender = gender;
    this.password = password;
    this.regDate = new Date();
  }

  @prop({ required: true, trim: true, unique: true })
  @ApiModelProperty()
  phone: string;

  @prop({ required: true, trim: true })
  @ApiModelProperty()
  surname: string;

  @prop({ required: true, trim: true })
  @ApiModelProperty()
  name: string;

  @prop({ trim: true, default: '' })
  @ApiModelProperty()
  patronymics: string;

  @prop({ required: true, trim: true })
  @ApiModelProperty()
  gender: Gender;

  @prop({ required: true, trim: true, validate: validators.password })
  @ApiModelProperty()
  password: string;

  @prop({ default: '' })
  @ApiModelProperty()
  hash: string;

  @prop({ default: new Date() })
  @ApiModelProperty()
  regDate: Date;
}
