import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("product_status_pkey", ["idStatus"], { unique: true })
@Entity("product_status", { schema: "public" })
export class ProductStatus {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_status" })
  idStatus: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Products, (products) => products.productStatus)
  products: Products[];
}
