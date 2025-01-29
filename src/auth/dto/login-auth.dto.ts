import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
