import { Wish } from "src/wishes/wish.model";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {
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
                image: string

                @ManyToMany(() => Wish)
                @JoinTable({
                    name: 'wishlist_items',
                    joinColumn: {
                        name: 'wishlist_id',
                        referencedColumnName: 'id',
                    }, 
                    inverseJoinColumn: {
                        name: 'wish_id',
                        referencedColumnName: 'id',
                    },
                })
                items: Wish[]
}