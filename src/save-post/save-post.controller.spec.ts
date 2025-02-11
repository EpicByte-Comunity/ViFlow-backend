import { Test, TestingModule } from '@nestjs/testing';
import { SavePostController } from './save-post.controller';
import { SavePostService } from './save-post.service';

describe('SavePostController', () => {
  let controller: SavePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavePostController],
      providers: [SavePostService],
    }).compile();

    controller = module.get<SavePostController>(SavePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
