import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Companies } from "./Companies";
import { FiscalPeriods } from "./FiscalPeriods";

@Index("ledgers_pkey", ["idLedger"], { unique: true })
@Entity("ledgers", { schema: "public" })
export class Ledgers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_ledger" })
  idLedger: number;

  @Column("numeric", { name: "debit", nullable: true, precision: 14, scale: 2 })
  debit: string | null;

  @Column("numeric", {
    name: "credit",
    nullable: true,
    precision: 14,
    scale: 2,
  })
  credit: string | null;

  @Column("numeric", {
    name: "balance",
    nullable: true,
    precision: 14,
    scale: 2,
  })
  balance: string | null;

  @Column("timestamp without time zone", {
    name: "last_updated",
    nullable: true,
    default: () => "now()",
  })
  lastUpdated: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.ledgers)
  @JoinColumn([{ name: "id_account", referencedColumnName: "idAccount" }])
  idAccount: Accounts;

  @ManyToOne(() => Companies, (companies) => companies.ledgers)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => FiscalPeriods, (fiscalPeriods) => fiscalPeriods.ledgers)
  @JoinColumn([{ name: "id_fiscal_period", referencedColumnName: "idPeriod" }])
  idFiscalPeriod: FiscalPeriods;
}
