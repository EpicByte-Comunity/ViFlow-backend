import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280, { message: 'El tweet no puede tener más de 280 caracteres' })
  text: string;
}
