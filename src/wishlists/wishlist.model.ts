import { IsArray } from "class-validator";
import { UserPublicProfileResponseDto } from "src/users/dtoUser/user-public-profile-response.dto";
import { Wish } from "src/wishes/wish.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column()
  owner: UserPublicProfileResponseDto;

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
