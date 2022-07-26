import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { Like } from './Like';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 255,
  })
  message: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @OneToMany(() => Like, like => like.comment)
  likes: Like[];
}
