import { BaseEntity } from 'src/common/helper/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Retweet } from './retweet.entity';
import { TweetLike } from './tweet.like.entity';
import { TweetComment } from './tweet-comment.entity';

@Entity('tweets')
export class Tweet extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text' })
  text: string;

  @OneToMany(() => Retweet, (retweet) => retweet.tweet, { onDelete: 'CASCADE' })
  retweets: Retweet[];

  @OneToMany(() => TweetLike, (like) => like.tweet, { onDelete: 'CASCADE' })
  likes: TweetLike[];

  @OneToMany(() => TweetComment, (comment) => comment.tweet, {
    onDelete: 'CASCADE',
  })
  comments: TweetComment[];
}
