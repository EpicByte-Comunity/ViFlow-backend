import { Module } from '@nestjs/common';
import { StoryViewsService } from './story-views.service';
import { StoryViewsController } from './story-views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryView } from './entities/story-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoryView])],
  controllers: [StoryViewsController],
  providers: [StoryViewsService],
})
export class StoryViewsModule {}
