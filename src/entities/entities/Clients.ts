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
import { Invoices } from "./Invoices";
import { SalesOrders } from "./SalesOrders";

@Index("clients_pkey", ["idClient"], { unique: true })
@Entity("clients", { schema: "public" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_client" })
  idClient: number;

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

  @Column("character varying", { name: "nrc", nullable: true, length: 20 })
  nrc: string | null;

  @Column("character varying", { name: "dui", nullable: true, length: 20 })
  dui: string | null;

  @Column("boolean", { name: "is_natural_person", nullable: true })
  isNaturalPerson: boolean | null;

  @ManyToOne(() => Companies, (companies) => companies.clients)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @OneToMany(() => Invoices, (invoices) => invoices.idClient)
  invoices: Invoices[];

  @OneToMany(() => SalesOrders, (salesOrders) => salesOrders.idClient)
  salesOrders: SalesOrders[];
}
