import { prop, index } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
type Gender = 'male' | 'female';

@index({phone: 1}, { unique: true, background: true })
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

  @prop({ required: true, trim: true, default: '' })
  @ApiModelProperty()
  patronymics: string;

  @prop({ required: true, trim: true })
  @ApiModelProperty()
  gender: Gender;

  @prop({ required: true, trim: true, })
  @ApiModelProperty()
  password: string;

  @prop({ required: true })
  @ApiModelProperty()
  regDate: Date;
}
