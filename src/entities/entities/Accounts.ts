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
import { JournalEntryDetails } from "./JournalEntryDetails";
import { Ledgers } from "./Ledgers";

@Index("accounts_pkey", ["idAccount"], { unique: true })
@Entity("accounts", { schema: "public" })
export class Accounts {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_account" })
  idAccount: number;

  @Column("character varying", { name: "account_number", length: 50 })
  accountNumber: string;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "account_type", length: 50 })
  accountType: string;

  @Column("integer", { name: "level", default: () => "1" })
  level: number;

  @ManyToOne(() => Companies, (companies) => companies.accounts)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => Accounts, (accounts) => accounts.accounts)
  @JoinColumn([
    { name: "parent_account_id", referencedColumnName: "idAccount" },
  ])
  parentAccount: Accounts;

  @OneToMany(() => Accounts, (accounts) => accounts.parentAccount)
  accounts: Accounts[];

  @OneToMany(
    () => JournalEntryDetails,
    (journalEntryDetails) => journalEntryDetails.idAccount
  )
  journalEntryDetails: JournalEntryDetails[];

  @OneToMany(() => Ledgers, (ledgers) => ledgers.idAccount)
  ledgers: Ledgers[];
}
