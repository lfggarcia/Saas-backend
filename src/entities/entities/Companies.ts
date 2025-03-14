import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Branches } from "./Branches";
import { Clients } from "./Clients";
import { CompaniesGiros } from "./CompaniesGiros";
import { FiscalPeriods } from "./FiscalPeriods";
import { JournalEntries } from "./JournalEntries";
import { Ledgers } from "./Ledgers";
import { Products } from "./Products";
import { Providers } from "./Providers";
import { Taxonomies } from "./Taxonomies";
import { Users } from "./Users";
import { VariationAttributes } from "./VariationAttributes";

@Index("companies_pkey", ["idCompany"], { unique: true })
@Entity("companies", { schema: "public" })
export class Companies {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_company" })
  idCompany: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "address", nullable: true })
  address: string | null;

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

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "nrc", nullable: true, length: 20 })
  nrc: string | null;

  @Column("character varying", { name: "dui", nullable: true, length: 20 })
  dui: string | null;

  @Column("boolean", { name: "is_natural_person", nullable: true })
  isNaturalPerson: boolean | null;

  @OneToMany(() => Accounts, (accounts) => accounts.idCompany)
  accounts: Accounts[];

  @OneToMany(() => Branches, (branches) => branches.idCompany)
  branches: Branches[];

  @OneToMany(() => Clients, (clients) => clients.idCompany)
  clients: Clients[];

  @ManyToOne(() => Companies, (companies) => companies.companies)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "idCompany" }])
  parent: Companies;

  @OneToMany(() => Companies, (companies) => companies.parent)
  companies: Companies[];

  @OneToMany(() => CompaniesGiros, (companiesGiros) => companiesGiros.idCompany)
  companiesGiros: CompaniesGiros[];

  @OneToMany(() => FiscalPeriods, (fiscalPeriods) => fiscalPeriods.idCompany)
  fiscalPeriods: FiscalPeriods[];

  @OneToMany(() => JournalEntries, (journalEntries) => journalEntries.idCompany)
  journalEntries: JournalEntries[];

  @OneToMany(() => Ledgers, (ledgers) => ledgers.idCompany)
  ledgers: Ledgers[];

  @OneToMany(() => Products, (products) => products.idCompany)
  products: Products[];

  @OneToMany(() => Providers, (providers) => providers.idCompany)
  providers: Providers[];

  @OneToMany(() => Taxonomies, (taxonomies) => taxonomies.idCompany)
  taxonomies: Taxonomies[];

  @OneToMany(() => Users, (users) => users.idClientCompany)
  users: Users[];

  @OneToMany(() => Users, (users) => users.idCompany)
  users2: Users[];

  @OneToMany(
    () => VariationAttributes,
    (variationAttributes) => variationAttributes.idCompany
  )
  variationAttributes: VariationAttributes[];
}
