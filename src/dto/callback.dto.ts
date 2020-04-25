import { ApiProperty } from '@nestjs/swagger';

export class NewCallbackDto {
  @ApiProperty()
  doctorId: string;
  @ApiProperty()
  patientPhone: string;
  @ApiProperty()
  speciality: string;
}
