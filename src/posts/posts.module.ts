import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Hashtag]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
