import { Test, TestingModule } from '@nestjs/testing';
import { PostHashtagsService } from './post-hashtags.service';

describe('PostHashtagsService', () => {
  let service: PostHashtagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostHashtagsService],
    }).compile();

    service = module.get<PostHashtagsService>(PostHashtagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
