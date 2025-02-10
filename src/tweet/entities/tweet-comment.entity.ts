import { Column, Entity, ManyToOne } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/common/helper/base.entity';

@Entity('tweet_comments')
export class TweetComment extends BaseEntity {
  @ManyToOne(() => Tweet, (tweet) => tweet.comments, { onDelete: 'CASCADE' })
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.tweetComments)
  user: User;

  @Column({ type: 'text' })
  commentText: string;
}
