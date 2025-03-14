import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Branches } from "./Branches";
import { Companies } from "./Companies";
import { Currencies } from "./Currencies";
import { DocumentTypes } from "./DocumentTypes";
import { FiscalPeriods } from "./FiscalPeriods";
import { JournalEntryDetails } from "./JournalEntryDetails";

@Index("journal_entries_pkey", ["idJournalEntry"], { unique: true })
@Entity("journal_entries", { schema: "public" })
export class JournalEntries {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_journal_entry" })
  idJournalEntry: number;

  @Column("date", { name: "entry_date" })
  entryDate: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("numeric", {
    name: "exchange_rate",
    precision: 12,
    scale: 4,
    default: () => "1.00",
  })
  exchangeRate: string;

  @Column("integer", { name: "id_document_reference", nullable: true })
  idDocumentReference: number | null;

  @Column("numeric", {
    name: "total_debits",
    nullable: true,
    precision: 14,
    scale: 2,
  })
  totalDebits: string | null;

  @Column("numeric", {
    name: "total_credits",
    nullable: true,
    precision: 14,
    scale: 2,
  })
  totalCredits: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.journalEntries)
  @JoinColumn([{ name: "created_by", referencedColumnName: "idUser" }])
  createdBy: Users;

  @ManyToOne(() => Branches, (branches) => branches.journalEntries)
  @JoinColumn([{ name: "id_branch", referencedColumnName: "idBranch" }])
  idBranch: Branches;

  @ManyToOne(() => Companies, (companies) => companies.journalEntries)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => Currencies, (currencies) => currencies.journalEntries)
  @JoinColumn([{ name: "id_currency", referencedColumnName: "idCurrency" }])
  idCurrency: Currencies;

  @ManyToOne(
    () => DocumentTypes,
    (documentTypes) => documentTypes.journalEntries
  )
  @JoinColumn([{ name: "id_document_type", referencedColumnName: "idType" }])
  idDocumentType: DocumentTypes;

  @ManyToOne(
    () => FiscalPeriods,
    (fiscalPeriods) => fiscalPeriods.journalEntries
  )
  @JoinColumn([{ name: "id_fiscal_period", referencedColumnName: "idPeriod" }])
  idFiscalPeriod: FiscalPeriods;

  @OneToMany(
    () => JournalEntryDetails,
    (journalEntryDetails) => journalEntryDetails.idJournalEntry
  )
  journalEntryDetails: JournalEntryDetails[];
}
