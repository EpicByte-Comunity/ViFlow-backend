import { IsUUID } from 'class-validator';

export class TweetActionDto {
  @IsUUID('4', { message: 'El ID del tweet no es válido' })
  id: string;
}
