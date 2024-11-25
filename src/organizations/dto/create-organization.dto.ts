import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'Xttreme Dev',
    description: 'The name of the organization',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;
}
