import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Role } from './Role';
import { Post } from './Post';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    nullable: true,
    length: 255,
  })
  gender: string;

  @Column({
    nullable: false,
    length: 255,
  })
  ocupation: string;

  @Column({
    nullable: false,
    length: 255,
  })
  city: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}
