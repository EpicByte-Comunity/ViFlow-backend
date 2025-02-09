import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { StoriesModule } from './stories/stories.module';
import { StoryViewsModule } from './story-views/story-views.module';
import { CollectionsModule } from './collections/collections.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { PostHashtagsModule } from './post-hashtags/post-hashtags.module';
import { FollowModule } from './follow/follow.module';
import { SavePostModule } from './save-post/save-post.module';
import { EmailModule } from './email/email.module';
import { TweetModule } from './tweet/tweet.module';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    StoriesModule,
    StoryViewsModule,
    CollectionsModule,
    NotificationsModule,
    HashtagsModule,
    PostHashtagsModule,
    FollowModule,
    SavePostModule,
    EmailModule,
    TweetModule,
    PollModule,
  ],
})
export class AppModule {}
