import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User"
import { Comment } from './Comment';

@Entity("posts")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        length: 255,
    }) 
    message: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(()=>Comment, (comment)=> comment.post)
    comments: Comment[];
}