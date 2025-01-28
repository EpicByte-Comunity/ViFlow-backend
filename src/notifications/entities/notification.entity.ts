import { BaseEntity } from 'src/common/helper/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column()
  type: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
