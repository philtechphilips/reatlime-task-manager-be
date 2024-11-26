import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Create the app dashboard',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    example: 'This is the taSK description',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  details: string;

  @ApiProperty({
    example: '',
  })
  @IsDate()
  @IsOptional()
  dueDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  status: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  priority: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  assigneeId: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  projectId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    description: 'Array of uploaded files',
  })
  @IsOptional()
  attachments: any[];

  @ApiProperty({
    example: '22a9f442-75d0-4b4e-9ffe-f9afcd449607',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  organizationId: string;
}
