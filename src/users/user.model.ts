import { Offer } from "src/offers/offer.model";
import { Wish } from "src/wishes/wish.model";
import { Wishlist } from "src/wishlists/wishlist.model";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({
        type: "varchar",
        length: 30,
        unique: true,
    })
    username: string

    @Column({
        type: "varchar",
        length: 200,
        default: "Пока ничего не рассказал о себе"
    })
    about: string

    @Column({
        type: "varchar",
        default: "https://i.pravatar.cc/300"
    })
    avatar: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Wish, wish => wish.owner)
    wishes: Wish[]

    @OneToMany(() => Offer, offer => offer.user)
    offers: Wish[]

    @ManyToMany(() => Wishlist)
    @JoinTable()
    wishlists: Wishlist[]
}