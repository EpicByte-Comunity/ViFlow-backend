import { BaseEntity } from 'src/common/helper/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('likes')
export class Like extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
