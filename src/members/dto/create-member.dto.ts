import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  organizationId: string;
}
