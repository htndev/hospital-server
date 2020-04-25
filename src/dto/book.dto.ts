import { ApiProperty } from '@nestjs/swagger';

export class NewBookDto {
  @ApiProperty() callbackId: string;
  @ApiProperty() doctorId: string;
  @ApiProperty() patientPhone: string;
  @ApiProperty() speciality: string;
  @ApiProperty() acceptanceDate: Date;
  @ApiProperty() comment?: string;
}

export class UpdateBookDto {
  @ApiProperty() id: string;
  @ApiProperty() acceptanceDate: Date;
  @ApiProperty() comment: string;
}
