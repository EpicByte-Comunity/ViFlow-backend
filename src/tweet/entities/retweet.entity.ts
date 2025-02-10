import { Entity, ManyToOne } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/common/helper/base.entity';

@Entity('retweets')
export class Retweet extends BaseEntity {
  @ManyToOne(() => Tweet, (tweet) => tweet.retweets, { onDelete: 'CASCADE' })
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.retweets)
  user: User;
}
