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
import { JournalEntries } from "./JournalEntries";
import { Ledgers } from "./Ledgers";

@Index("fiscal_periods_pkey", ["idPeriod"], { unique: true })
@Entity("fiscal_periods", { schema: "public" })
export class FiscalPeriods {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_period" })
  idPeriod: number;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @ManyToOne(() => Companies, (companies) => companies.fiscalPeriods)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @OneToMany(
    () => JournalEntries,
    (journalEntries) => journalEntries.idFiscalPeriod
  )
  journalEntries: JournalEntries[];

  @OneToMany(() => Ledgers, (ledgers) => ledgers.idFiscalPeriod)
  ledgers: Ledgers[];
}
