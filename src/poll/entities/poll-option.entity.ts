import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Poll } from './poll.entity';

@Entity('poll_options')
export class PollOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' })
  poll: Poll;

  @Column({ type: 'text' })
  optionText: string;

  @Column({ type: 'int', default: 0 })
  votes: number;
}
