import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetLike } from './entities/tweet.like.entity';
import { TweetComment } from './entities/tweet-comment.entity';
import { Retweet } from './entities/retweet.entity';
import { Response } from 'src/common/response/response.type';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { ResponseList } from 'src/common/helper/paginador/type/paginator.type';
import { Paginator } from 'src/common/helper/paginador/paginator.helper';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SanitizedTweet } from 'src/common/type/tweet.types';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(TweetLike)
    private readonly likeRepo: Repository<TweetLike>,
    @InjectRepository(TweetComment)
    private readonly commentRepo: Repository<TweetComment>,
    @InjectRepository(Retweet)
    private readonly retweetRepo: Repository<Retweet>,
  ) {}

  async createTweet(
    req: AuthenticatedRequest,
    createTweetDto: CreateTweetDto,
  ): Promise<Response<Tweet>> {
    const user = req.user;
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    if (!createTweetDto.text || createTweetDto.text.trim().length === 0)
      throw new BadRequestException('El tweet no puede estar vacío');

    const tweet = this.tweetRepo.create({
      user: { id: user.id },
      text: createTweetDto.text.trim(),
    });

    await this.tweetRepo.save(tweet);

    return {
      status: true,
      message: 'Tweet creado exitosamente',
      data: tweet,
    };
  }

  async getAllTweets(
    page: number,
    limit: number,
  ): Promise<ResponseList<SanitizedTweet>> {
    if (!page || !limit || page < 1 || limit < 1) {
      throw new BadRequestException('Page y limit deben ser valores positivos');
    }

    const [tweets, count] = await this.tweetRepo.findAndCount({
      relations: ['user', 'likes', 'comments', 'retweets'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const sanitizedTweets: SanitizedTweet[] = tweets.map((tweet) => {
      if (tweet.user) {
        const {
          password,
          verificationCode,
          verificationCodeExpiry,
          ...userWithoutSensitiveData
        } = tweet.user;
        return { ...tweet, user: userWithoutSensitiveData };
      }
      return tweet;
    });

    return Paginator.Format<SanitizedTweet>(
      sanitizedTweets,
      count,
      page,
      limit,
    );
  }

  async deleteTweet(
    req: AuthenticatedRequest,
    tweetId: string,
  ): Promise<Response<null>> {
    const user = req.user;
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    const tweet = await this.tweetRepo.findOne({
      where: { id: tweetId },
      relations: ['user'],
    });

    if (!tweet) throw new NotFoundException('Tweet no encontrado');

    if (tweet.user.id !== user.id)
      throw new ForbiddenException('No puedes eliminar este tweet');

    await this.tweetRepo.delete(tweet.id);

    return {
      status: true,
      message: 'Tweet eliminado correctamente',
      data: null,
    };
  }

  async likeTweet(
    req: AuthenticatedRequest,
    tweetId: string,
  ): Promise<Response<string>> {
    const user = req.user;
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    const tweet = await this.tweetRepo.findOne({
      where: { id: tweetId },
    });

    if (!tweet) throw new NotFoundException('Tweet no encontrado');

    const existingLike = await this.likeRepo.findOne({
      where: { user: { id: user.id }, tweet: { id: tweetId } },
    });

    if (existingLike) {
      await this.likeRepo.remove(existingLike);
      return { status: true, message: 'Like eliminado', data: 'unliked' };
    }

    const like = this.likeRepo.create({ user: { id: user.id }, tweet });
    await this.likeRepo.save(like);

    return { status: true, message: 'Tweet likeado', data: 'liked' };
  }

  async retweet(
    req: AuthenticatedRequest,
    tweetId: string,
  ): Promise<Response<string>> {
    const user = req.user;
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    const tweet = await this.tweetRepo.findOne({
      where: { id: tweetId },
    });

    if (!tweet) throw new NotFoundException('Tweet no encontrado');

    const existingRetweet = await this.retweetRepo.findOne({
      where: { user: { id: user.id }, tweet: { id: tweetId } },
    });

    if (existingRetweet) {
      await this.retweetRepo.remove(existingRetweet);
      return {
        status: true,
        message: 'Retweet eliminado',
        data: 'unretweeted',
      };
    }

    const retweet = this.retweetRepo.create({ user: { id: user.id }, tweet });
    await this.retweetRepo.save(retweet);

    return { status: true, message: 'Retweet creado', data: 'retweeted' };
  }

  async commentTweet(
    req: AuthenticatedRequest,
    tweetId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Response<TweetComment>> {
    const user = req.user;
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    if (
      !createCommentDto.commentText ||
      createCommentDto.commentText.trim().length === 0
    ) {
      throw new BadRequestException('El comentario no puede estar vacío');
    }

    const tweet = await this.tweetRepo.findOne({
      where: { id: tweetId },
    });

    if (!tweet) throw new NotFoundException('Tweet no encontrado');

    const comment = this.commentRepo.create({
      user: { id: user.id },
      tweet,
      commentText: createCommentDto.commentText.trim(),
    });

    await this.commentRepo.save(comment);

    return {
      status: true,
      message: 'Comentario agregado',
      data: comment,
    };
  }
}
