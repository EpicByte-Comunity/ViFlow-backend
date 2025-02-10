import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetActionDto } from './dto/tweet-action.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  createTweet(
    @Req() req: AuthenticatedRequest,
    @Body() createTweetDto: CreateTweetDto,
  ) {
    return this.tweetService.createTweet(req, createTweetDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.tweetService.getAllTweets(page, limit);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  deleteTweet(@Req() req: AuthenticatedRequest, @Param('id') tweetId: string) {
    return this.tweetService.deleteTweet(req, tweetId);
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  likeTweet(
    @Req() req: AuthenticatedRequest,
    @Param() tweetActionDto: TweetActionDto,
  ) {
    return this.tweetService.likeTweet(req, tweetActionDto.id);
  }

  @Post(':id/retweet')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  retweet(
    @Req() req: AuthenticatedRequest,
    @Param() tweetActionDto: TweetActionDto,
  ) {
    return this.tweetService.retweet(req, tweetActionDto.id);
  }

  @Post(':id/comment')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  commentTweet(
    @Req() req: AuthenticatedRequest,
    @Param() tweetActionDto: TweetActionDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log('Tweet ID recibido:', tweetActionDto.id);
    return this.tweetService.commentTweet(
      req,
      tweetActionDto.id,
      createCommentDto,
    );
  }
}
