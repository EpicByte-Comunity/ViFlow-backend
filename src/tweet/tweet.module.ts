import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetComment } from './entities/tweet-comment.entity';
import { TweetLike } from './entities/tweet.like.entity';
import { Retweet } from './entities/retweet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tweet, TweetComment, TweetLike, Retweet]),
    AuthModule,
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
