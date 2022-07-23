import { userInfo } from "os"
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm"
import { User } from "./User"

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        length: 255,
    }) 
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}