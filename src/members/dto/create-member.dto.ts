import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    example: 'pelumiisola87@gmail.com',
    description: 'The id of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    example: '22a9f442-75d0-4b4e-9ffe-f9afcd449607',
    description: 'The id of the organization',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  organizationId: string;
}
