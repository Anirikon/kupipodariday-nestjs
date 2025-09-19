import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number
        
            @Column()
            createdAt: Date
        
            @Column()
            updatedAt: Date

            @Column({
                length: 200
            })
            name: string

            @Column()
            link: string

            @Column()
            image: URL

            @Column()
            price: number

            @Column()
            raised: number

            @Column()
            owner: string

            @Column({
                length: 1024
            })
            description: string

            @Column()
            offers: [string]

            @Column()
            copied: number
}