import { Tweet } from '../../tweet/entities/tweet.entity';
import { User } from '../../user/entities/user.entity';

export type SanitizedTweet = Omit<Tweet, 'user'> & {
  user: Omit<User, 'password' | 'verificationCode' | 'verificationCodeExpiry'>;
};
