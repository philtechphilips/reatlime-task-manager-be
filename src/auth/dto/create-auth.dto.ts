import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: 'pelumi150',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  password: string;

  @ApiProperty({
    example: 'pelumiisola87@gmail.com',
    description: 'The email address of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  email: string;
}
