import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { PollOption } from './poll-option.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('poll_votes')
export class PollVote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' })
  poll: Poll;

  @ManyToOne(() => PollOption, (option) => option.votes, {
    onDelete: 'CASCADE',
  })
  option: PollOption;

  @ManyToOne(() => User, (user) => user.pollVotes, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'voted_at' })
  votedAt: Date;
}
