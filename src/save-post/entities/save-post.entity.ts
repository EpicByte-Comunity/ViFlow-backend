import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('saved_posts')
export class SavePost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.savedPosts)
  user: User;

  @ManyToOne(() => Post, (post) => post.savedPosts)
  post: Post;

  @CreateDateColumn()
  created_at: Date;
}
