import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User"

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
}