import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  password: string;

  @ApiProperty({
    example: 'Pelumi Isola',
    description: 'The full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  fullName: string;

  @ApiProperty({
    example: 'Xttreme Developers',
    description: 'The company name of the user',
  })
  @IsString()
  @IsOptional()
  company: string;

  @ApiProperty({
    example: 'email',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value || false)
  isVerified: boolean = false;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
