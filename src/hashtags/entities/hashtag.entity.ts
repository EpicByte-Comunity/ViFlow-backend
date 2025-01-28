import { BaseEntity } from "src/common/helper/base.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity('hashtags')
export class Hashtag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.hashtags)
  posts: Post[];
}
