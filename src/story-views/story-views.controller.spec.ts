import { Test, TestingModule } from '@nestjs/testing';
import { StoryViewsController } from './story-views.controller';
import { StoryViewsService } from './story-views.service';

describe('StoryViewsController', () => {
  let controller: StoryViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryViewsController],
      providers: [StoryViewsService],
    }).compile();

    controller = module.get<StoryViewsController>(StoryViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
