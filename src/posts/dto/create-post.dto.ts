import {  IsOptional, IsString,  } from 'class-validator';

export class CreatePostDto {

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  caption?: string;
}
