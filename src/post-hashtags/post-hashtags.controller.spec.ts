import { Test, TestingModule } from '@nestjs/testing';
import { PostHashtagsController } from './post-hashtags.controller';
import { PostHashtagsService } from './post-hashtags.service';

describe('PostHashtagsController', () => {
  let controller: PostHashtagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostHashtagsController],
      providers: [PostHashtagsService],
    }).compile();

    controller = module.get<PostHashtagsController>(PostHashtagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
