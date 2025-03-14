import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { JournalEntries } from "./JournalEntries";

@Index("currencies_pkey", ["idCurrency"], { unique: true })
@Entity("currencies", { schema: "public" })
export class Currencies {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_currency" })
  idCurrency: number;

  @Column("character varying", { name: "code", length: 10 })
  code: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Invoices, (invoices) => invoices.idCurrency)
  invoices: Invoices[];

  @OneToMany(
    () => JournalEntries,
    (journalEntries) => journalEntries.idCurrency
  )
  journalEntries: JournalEntries[];
}
