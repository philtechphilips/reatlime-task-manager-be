import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    example: '2180c469-ba2b-44a0-9e3a-9aca3ca5d5b2',
    description: 'The id of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  userId: string;

  @ApiProperty({
    example: '22a9f442-75d0-4b4e-9ffe-f9afcd449607',
    description: 'The id of the organization',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  organizationId: string;
}
