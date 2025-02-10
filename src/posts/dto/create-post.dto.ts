import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsArray()
  hashtags?: string[];
}
