import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryViewDto } from './create-story-view.dto';

export class UpdateStoryViewDto extends PartialType(CreateStoryViewDto) {}
