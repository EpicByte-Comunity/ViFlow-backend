import { BaseEntity } from 'src/common/helper/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity("tweets")
export class Tweet extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text' })
  text: string;
}
