import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
        id: number
    
        @Column()
        createdAt: Date
    
        @Column()
        updatedAt: Date

        @Column()
        user: number

        @Column()
        item: string

        @Column()
        amount: number

        @Column({
            default: false
        })
        hidden: boolean
}