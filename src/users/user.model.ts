import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column({
        type: "string",
        length: 30,
        unique: true,
    })
    username: string

    @Column({
        type: "string",
        length: 200,
        default: "Пока ничего не рассказал о себе"
    })
    about: string

    @Column({
        type: "string",
        default: "https://i.pravatar.cc/300"
    })
    avatar: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    wishes: [object]

    @Column()
    offers: [object]

    @Column()
    wishlists: [[object]]
}