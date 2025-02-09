import { IsEnum, IsUUID } from 'class-validator';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}

export class ReactToPostDto {
  @IsUUID()
  postId: string;

  @IsEnum(ReactionType)
  reaction: ReactionType;
}
