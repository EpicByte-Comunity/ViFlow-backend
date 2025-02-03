import { IsString, Length } from 'class-validator';

export class VerifyCodeDto {
  @IsString()
  @Length(6, 6, {
    message: 'The verification code must be exactly 6 characters long',
  })
  code: string;
}
