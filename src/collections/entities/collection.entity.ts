import { BaseEntity } from 'src/common/helper/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('collections')
export class Collection extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.collections, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Post)
  @JoinTable({ name: 'collections_post' })
  posts: Post[];
}
