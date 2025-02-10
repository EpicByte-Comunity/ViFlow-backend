import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Response } from 'src/common/response/response.type';
import { User } from 'src/user/entities/user.entity';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { ResponseList } from 'src/common/helper/paginador/type/paginator.type';
import { Paginator } from 'src/common/helper/paginador/paginator.helper';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async create(
    req: AuthenticatedRequest,
    createPostDto: CreatePostDto,
  ): Promise<Response<Post>> {
    const { hashtags, ...postData } = createPostDto;

    const user = await this.userRepository.findOne({
      where: { email: req.user.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const existingPost = await this.postRepository.findOne({
      where: {
        caption: postData.caption,
        image_url: postData.image_url,
        user: { id: user.id },
      },
    });

    if (existingPost) throw new ConflictException('Post already exists');

    let hashtagEntities: Hashtag[] = [];

    if (hashtags?.length) {
      // Buscar hashtags existentes
      hashtagEntities = await this.hashtagRepository.find({
        where: { name: In(hashtags) },
      });

      // Filtrar hashtags nuevos
      const existingHashtags = hashtagEntities.map((h) => h.name);
      const newHashtags = hashtags.filter((h) => !existingHashtags.includes(h));

      if (newHashtags.length) {
        const createdHashtags = this.hashtagRepository.create(
          newHashtags.map((name) => ({ name })),
        );
        await this.hashtagRepository.save(createdHashtags);
        hashtagEntities = [...hashtagEntities, ...createdHashtags];
      }
    }

    // Crear y guardar el post
    const post = this.postRepository.create({
      ...postData,
      user,
      hashtags: hashtagEntities,
    });

    await this.postRepository.save(post);

    const {
      password,
      verificationCode,
      verificationCodeExpiry,
      ...userWithoutSensitiveData
    } = user;

    return {
      status: true,
      message: 'Post created successfully',
      data: {
        ...post,
        user: userWithoutSensitiveData as User,
      },
    };
  }

  async findAll(page: number, limit: number): Promise<ResponseList<Post>> {

    if (!page || !limit)
      throw new BadRequestException('Page and limit are required');

    const [posts, count] = await this.postRepository.findAndCount({
      relations: ['user', 'hashtags', 'comments', 'likes'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return Paginator.Format(posts, count, page, limit);
  }

  async findOne(id: string): Promise<Response<Post>> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user', 'hashtags', 'comments', 'likes'],
    });

    if (!post) throw new NotFoundException('Post not found');

    return {
      status: true,
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  async update(
    req: AuthenticatedRequest,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Response<Post>> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found');

    if (!post.user || !post.user.id)
      throw new NotFoundException('User not found in post');

    if (req.user.id !== post.user.id)
      throw new ForbiddenException(
        'You are not authorized to update this post',
      );

    let hashtagEntities: Hashtag[] = [];

    if (updatePostDto.hashtags?.length) {
      hashtagEntities = await this.hashtagRepository.find({
        where: { name: In(updatePostDto.hashtags) },
      });

      const existingHashtags = hashtagEntities.map((h) => h.name);
      const newHashtags = updatePostDto.hashtags.filter(
        (h) => !existingHashtags.includes(h),
      );

      if (newHashtags.length) {
        const createdHashtags = this.hashtagRepository.create(
          newHashtags.map((name) => ({ name })),
        );
        await this.hashtagRepository.save(createdHashtags);
        hashtagEntities = [...hashtagEntities, ...createdHashtags];
      }
    }

    const updatedPost = {
      ...post,
      ...updatePostDto,
      hashtags: hashtagEntities,
    };

    await this.postRepository.save(updatedPost);

    return {
      status: true,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  async remove(req: AuthenticatedRequest, id: string): Promise<Response<null>> {
    const post = await this.findOne(id);

    if (!post.data.user || !post.data.user.id)
      throw new NotFoundException('User not found in post');

    if (req.user.id !== post.data.user.id)
      throw new ForbiddenException(
        'You are not authorized to delete this post',
      );

    await this.postRepository.remove(post.data);

    return {
      status: true,
      message: 'Post deleted successfully',
      data: null,
    };
  }
}
