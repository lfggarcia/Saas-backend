import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { Purchases } from "./Purchases";
import { SalesOrders } from "./SalesOrders";

@Index("document_status_pkey", ["idStatus"], { unique: true })
@Entity("document_status", { schema: "public" })
export class DocumentStatus {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_status" })
  idStatus: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Invoices, (invoices) => invoices.idDocumentStatus)
  invoices: Invoices[];

  @OneToMany(() => Purchases, (purchases) => purchases.status)
  purchases: Purchases[];

  @OneToMany(() => SalesOrders, (salesOrders) => salesOrders.status)
  salesOrders: SalesOrders[];
}
