import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        length: 255,
    }) 
    email: string

    @Column({
        nullable: false,
        length: 255,
    })
    password: string
}