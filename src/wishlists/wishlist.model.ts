import { IsArray } from "class-validator";
import { User } from "src/users/user.model";
import { Wish } from "src/wishes/wish.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 250,
  })
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable({
    name: "wishlist_items",
    joinColumn: {
      name: "wishlist_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "wish_id",
      referencedColumnName: "id",
    },
  })
  items: Wish[];

  @IsArray()
  itemsId: number[];
}
