import { StoryView } from 'src/story-views/entities/story-view.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_url: string;

  @Column({ default: 0 })
  views_count: number;

  @Column()
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.stories)
  user: User;

  @OneToMany(() => StoryView, (storyView) => storyView.story)
  views: StoryView[];
}
