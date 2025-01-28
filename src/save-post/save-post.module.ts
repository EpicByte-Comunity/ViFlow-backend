import { Module } from '@nestjs/common';
import { SavePostService } from './save-post.service';
import { SavePostController } from './save-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavePost } from './entities/save-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavePost])],
  controllers: [SavePostController],
  providers: [SavePostService],
})
export class SavePostModule {}
