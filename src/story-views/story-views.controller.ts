import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoryViewsService } from './story-views.service';
import { CreateStoryViewDto } from './dto/create-story-view.dto';
import { UpdateStoryViewDto } from './dto/update-story-view.dto';

@Controller('story-views')
export class StoryViewsController {
  constructor(private readonly storyViewsService: StoryViewsService) {}

  @Post()
  create(@Body() createStoryViewDto: CreateStoryViewDto) {
    return this.storyViewsService.create(createStoryViewDto);
  }

  @Get()
  findAll() {
    return this.storyViewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyViewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryViewDto: UpdateStoryViewDto) {
    return this.storyViewsService.update(+id, updateStoryViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyViewsService.remove(+id);
  }
}
