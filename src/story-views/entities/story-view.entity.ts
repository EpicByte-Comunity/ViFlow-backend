import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('story_views')
export class StoryView {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Story, (story) => story.views)
  story: Story;

  @ManyToOne(() => User, (user) => user.stories)
  user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'viewed_at' })
  viewed_at: Date;
}
