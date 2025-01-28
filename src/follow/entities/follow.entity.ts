import { BaseEntity } from 'src/common/helper/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('follows')
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  followed: User;
}
