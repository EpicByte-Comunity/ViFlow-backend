import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  params: string;
}
