import { IsUUID } from 'class-validator';

export class SavePostDto {
  @IsUUID()
  postId: string;
}
