import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavePostService } from './save-post.service';
import { CreateSavePostDto } from './dto/create-save-post.dto';
import { UpdateSavePostDto } from './dto/update-save-post.dto';

@Controller('save-post')
export class SavePostController {
  constructor(private readonly savePostService: SavePostService) {}

  @Post()
  create(@Body() createSavePostDto: CreateSavePostDto) {
    return this.savePostService.create(createSavePostDto);
  }

  @Get()
  findAll() {
    return this.savePostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savePostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavePostDto: UpdateSavePostDto) {
    return this.savePostService.update(+id, updateSavePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savePostService.remove(+id);
  }
}
