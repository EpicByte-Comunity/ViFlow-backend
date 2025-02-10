import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280, {
    message: 'El comentario no puede tener más de 280 caracteres',
  })
  commentText: string;
}
