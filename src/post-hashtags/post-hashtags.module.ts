import { Module } from '@nestjs/common';
import { PostHashtagsService } from './post-hashtags.service';
import { PostHashtagsController } from './post-hashtags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHashtag } from './entities/post-hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostHashtag])],
  controllers: [PostHashtagsController],
  providers: [PostHashtagsService],
})
export class PostHashtagsModule {}
