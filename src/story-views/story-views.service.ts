import { Injectable } from '@nestjs/common';
import { CreateStoryViewDto } from './dto/create-story-view.dto';
import { UpdateStoryViewDto } from './dto/update-story-view.dto';

@Injectable()
export class StoryViewsService {
  create(createStoryViewDto: CreateStoryViewDto) {
    return 'This action adds a new storyView';
  }

  findAll() {
    return `This action returns all storyViews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storyView`;
  }

  update(id: number, updateStoryViewDto: UpdateStoryViewDto) {
    return `This action updates a #${id} storyView`;
  }

  remove(id: number) {
    return `This action removes a #${id} storyView`;
  }
}
