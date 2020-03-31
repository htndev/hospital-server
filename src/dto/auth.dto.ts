import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  patronymics?: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  passwordConfirmation: string;
}
