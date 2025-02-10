import { Entity, ManyToOne } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/common/helper/base.entity';

@Entity('tweet_likes')
export class TweetLike extends BaseEntity {
  @ManyToOne(() => Tweet, (tweet) => tweet.likes, { onDelete: 'CASCADE' })
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.tweetLikes)
  user: User;
}
