import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Warehouses } from "./Warehouses";
import { Companies } from "./Companies";
import { Invoices } from "./Invoices";
import { JournalEntries } from "./JournalEntries";
import { Purchases } from "./Purchases";
import { SalesOrders } from "./SalesOrders";

@Index("branches_pkey", ["idBranch"], { unique: true })
@Entity("branches", { schema: "public" })
export class Branches {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_branch" })
  idBranch: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @ManyToMany(() => Warehouses, (warehouses) => warehouses.branches)
  @JoinTable({
    name: "branch_warehouses",
    joinColumns: [{ name: "id_branch", referencedColumnName: "idBranch" }],
    inverseJoinColumns: [
      { name: "id_warehouse", referencedColumnName: "idWarehouse" },
    ],
    schema: "public",
  })
  warehouses: Warehouses[];

  @ManyToOne(() => Companies, (companies) => companies.branches)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @OneToMany(() => Invoices, (invoices) => invoices.idBranch)
  invoices: Invoices[];

  @OneToMany(() => JournalEntries, (journalEntries) => journalEntries.idBranch)
  journalEntries: JournalEntries[];

  @OneToMany(() => Purchases, (purchases) => purchases.idBranch)
  purchases: Purchases[];

  @OneToMany(() => SalesOrders, (salesOrders) => salesOrders.idBranch)
  salesOrders: SalesOrders[];
}
