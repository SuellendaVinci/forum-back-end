import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User"
import { Post } from "./Post";

@Entity("comments")
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        length: 255,
    }) 
    message: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}