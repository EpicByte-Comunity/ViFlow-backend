import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  @IsStrongPassword()
  repeatPassword: string;
}
