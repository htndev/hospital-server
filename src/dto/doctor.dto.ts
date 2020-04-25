import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  patronymics: string;
  @ApiProperty()
  speciality: string;
}
