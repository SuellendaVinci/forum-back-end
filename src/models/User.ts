import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        length: 255,
    }) 
    name: string

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

    @Column({
        nullable: true,
        length: 255,
    })
    gender: string

    @Column({
        nullable: false,
        length: 255,
    })
    ocupation: string

    @Column({
        nullable: false,
        length: 255,
    })
    city: string

}