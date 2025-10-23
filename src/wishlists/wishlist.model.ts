import { IsArray } from "class-validator";
import { UserPublicProfileResponseDto } from "src/users/dtoUser/user-public-profile-response.dto";
import { WishPartial } from "src/wishes/wish-partial.model";
import { Wish } from "src/wishes/wish.model";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
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
  items: WishPartial[];

  @IsArray()
  itemsId: number[];
}
