import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";
import { Giros } from "./Giros";

@Index("companies_giros_pkey", ["idCompanyGiros"], { unique: true })
@Entity("companies_giros", { schema: "public" })
export class CompaniesGiros {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_company_giros" })
  idCompanyGiros: number;

  @Column("integer", { name: "level" })
  level: number;

  @ManyToOne(() => Companies, (companies) => companies.companiesGiros)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => Giros, (giros) => giros.companiesGiros)
  @JoinColumn([{ name: "id_giro", referencedColumnName: "idGiro" }])
  idGiro: Giros;
}
