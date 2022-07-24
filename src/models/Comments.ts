import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User"

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
}