import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostHashtagsService } from './post-hashtags.service';
import { CreatePostHashtagDto } from './dto/create-post-hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post-hashtag.dto';

@Controller('post-hashtags')
export class PostHashtagsController {
  constructor(private readonly postHashtagsService: PostHashtagsService) {}

  @Post()
  create(@Body() createPostHashtagDto: CreatePostHashtagDto) {
    return this.postHashtagsService.create(createPostHashtagDto);
  }

  @Get()
  findAll() {
    return this.postHashtagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postHashtagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostHashtagDto: UpdatePostHashtagDto) {
    return this.postHashtagsService.update(+id, updatePostHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postHashtagsService.remove(+id);
  }
}
