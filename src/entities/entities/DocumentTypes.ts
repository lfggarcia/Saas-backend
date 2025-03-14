import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { JournalEntries } from "./JournalEntries";

@Index("document_types_pkey", ["idType"], { unique: true })
@Entity("document_types", { schema: "public" })
export class DocumentTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_type" })
  idType: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Invoices, (invoices) => invoices.idDocumentType)
  invoices: Invoices[];

  @OneToMany(
    () => JournalEntries,
    (journalEntries) => journalEntries.idDocumentType
  )
  journalEntries: JournalEntries[];
}
