import { Offer } from "src/offers/offer.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number
        
            @Column({ type: 'date'})
            createdAt: Date
        
            @Column({ type: 'date'})
            updatedAt: Date

            @Column({ type: 'varchar', length: 250 })
            name: string

            @Column({ type: 'varchar' })
            link: string

            @Column({ type: 'varchar' })
            image: string

            @Column({ type: 'int' })
            price: number

            @Column({ type: 'int' })
            raised: number

            @Column({ type: 'varchar' })
            owner: string

            @Column({ type: 'varchar', length: 1024 })
            description: string

            @OneToMany(() => Offer, (offer) => offer.item)
            offers: Offer[]

            @Column({ type: 'int' })
            copied: number
}