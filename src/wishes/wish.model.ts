import { Offer } from "src/offers/offer.model";
import { UserPublicProfileResponseDto } from "src/users/dtoUser/user-public-profile-response.dto";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", length: 250 })
  name: string;

  @Column({ type: "varchar" })
  link: string;

  @Column({ type: "varchar" })
  image: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "int" })
  raised: number;

  @Column()
  owner: UserPublicProfileResponseDto;

  @Column({ type: "varchar", length: 1024 })
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ type: "int" })
  copied: number;
}
