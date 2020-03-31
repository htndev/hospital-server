import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  patronymics?: string;
}

export class UserUpdatePasswordDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  newPasswordConfirmation: string;
}
