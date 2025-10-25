import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class WishPartial {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "date" })
  createdAt?: Date;

  @Column({ type: "date" })
  updatedAt?: Date;

  @Column({ type: "varchar", length: 250 })
  name?: string;

  @Column({ type: "varchar" })
  link?: string;

  @Column({ type: "varchar" })
  image?: string;

  @Column({ type: "int" })
  price?: number;

  @Column({ type: "int" })
  raised?: number;

  @Column({ type: "int" })
  copied?: number;

  @Column({ type: "varchar", length: 1024 })
  description?: string;
}
