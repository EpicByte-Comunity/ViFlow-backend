import { Injectable } from '@nestjs/common';
import { CreateSavePostDto } from './dto/create-save-post.dto';
import { UpdateSavePostDto } from './dto/update-save-post.dto';

@Injectable()
export class SavePostService {
  create(createSavePostDto: CreateSavePostDto) {
    return 'This action adds a new savePost';
  }

  findAll() {
    return `This action returns all savePost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savePost`;
  }

  update(id: number, updateSavePostDto: UpdateSavePostDto) {
    return `This action updates a #${id} savePost`;
  }

  remove(id: number) {
    return `This action removes a #${id} savePost`;
  }
}
