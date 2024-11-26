import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Frontend Tasks',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    example: '22a9f442-75d0-4b4e-9ffe-f9afcd449607',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  organizationId: string;
}
