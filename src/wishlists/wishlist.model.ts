import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class wishlist {
    @PrimaryGeneratedColumn()
        id: number
            
                @Column()
                createdAt: Date
            
                @Column()
                updatedAt: Date

                @Column({
                    length: 250
                })
                name: string

                @Column({
                    length: 1500
                })
                description: string

                @Column()
                image: Blob

                @Column()
                items: [string]
}