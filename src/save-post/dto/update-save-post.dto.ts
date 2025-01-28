import { PartialType } from '@nestjs/mapped-types';
import { CreateSavePostDto } from './create-save-post.dto';

export class UpdateSavePostDto extends PartialType(CreateSavePostDto) {}
