import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'src/common/response/response.type';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    req: Request,
  ): Promise<Response<Post>> {
    const userId = req['user'];

    console.log(userId);

    return {
      status: true,
      message: 'Post created successfully',
      data: null,
    };
  }

  async remove(id: string): Promise<Response<null>> {
    const post = await this.postRepository.findOne({
      where: { id: Number(id) },
    });

    if (!post) throw new NotFoundException('Post not found');

    await this.postRepository.remove(post);
    return { status: true, message: 'Post deleted successfully', data: null };
  }
}
