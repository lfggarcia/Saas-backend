import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";
import { Purchases } from "./Purchases";

@Index("providers_pkey", ["idProvider"], { unique: true })
@Entity("providers", { schema: "public" })
export class Providers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_provider" })
  idProvider: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("character varying", {
    name: "tax_number",
    nullable: true,
    length: 20,
  })
  taxNumber: string | null;

  @Column("character varying", {
    name: "registration_number",
    nullable: true,
    length: 20,
  })
  registrationNumber: string | null;

  @ManyToOne(() => Companies, (companies) => companies.providers)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @OneToMany(() => Purchases, (purchases) => purchases.idProvider)
  purchases: Purchases[];
}
