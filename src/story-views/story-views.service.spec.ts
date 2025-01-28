import { Test, TestingModule } from '@nestjs/testing';
import { StoryViewsService } from './story-views.service';

describe('StoryViewsService', () => {
  let service: StoryViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryViewsService],
    }).compile();

    service = module.get<StoryViewsService>(StoryViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
