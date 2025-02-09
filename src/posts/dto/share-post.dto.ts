import { IsUUID, IsOptional, IsString } from 'class-validator';

export class SharePostDto {
  @IsUUID()
  postId: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
