// token.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
@Unique(['userId'])
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'text' })
  value: string;

  @ManyToOne(() => User, (user) => user.token)
  @JoinColumn({ name: 'userId' })
  user: User;

  // ... other token columns, like expiry etc.
}
