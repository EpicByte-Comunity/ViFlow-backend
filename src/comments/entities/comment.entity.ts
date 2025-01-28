import { BaseEntity } from 'src/common/helper/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ nullable: true, type: 'text' })
  comment_text: string;
}
