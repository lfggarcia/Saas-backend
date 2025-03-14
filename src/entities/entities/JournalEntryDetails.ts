import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { JournalEntries } from "./JournalEntries";

@Index("journal_entry_details_pkey", ["idJournalEntryDetail"], { unique: true })
@Entity("journal_entry_details", { schema: "public" })
export class JournalEntryDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_journal_entry_detail" })
  idJournalEntryDetail: number;

  @Column("numeric", {
    name: "debit",
    nullable: true,
    precision: 14,
    scale: 2,
    default: () => "0.00",
  })
  debit: string | null;

  @Column("numeric", {
    name: "credit",
    nullable: true,
    precision: 14,
    scale: 2,
    default: () => "0.00",
  })
  credit: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.journalEntryDetails)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Accounts;

  @ManyToOne(
    () => JournalEntries,
    (journalEntries) => journalEntries.journalEntryDetails
  )
  @JoinColumn([
    { name: "id_journal_entry", referencedColumnName: "idJournalEntry" },
  ])
  idJournalEntry: JournalEntries;
}
