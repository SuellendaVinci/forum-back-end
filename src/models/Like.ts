import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment";

@Entity("likes")
export class Like {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @ManyToOne(() => Comment, (comment) => comment.likes)
    comment: Comment;
}