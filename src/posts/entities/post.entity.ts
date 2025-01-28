import { BaseEntity } from 'src/common/helper/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';
import { SavePost } from 'src/save-post/entities/save-post.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  image_url: string;

  @Column({ type: 'text', nullable: true })
  caption: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  @JoinTable({ name: 'post_hashtags' })
  hashtags: Hashtag[];

  @OneToMany(() => SavePost, (savedPost) => savedPost.post)
  savedPosts: SavePost[];
}
