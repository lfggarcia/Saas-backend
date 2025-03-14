import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompaniesGiros } from "./CompaniesGiros";

@Index("giros_pkey", ["idGiro"], { unique: true })
@Entity("giros", { schema: "public" })
export class Giros {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_giro" })
  idGiro: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => CompaniesGiros, (companiesGiros) => companiesGiros.idGiro)
  companiesGiros: CompaniesGiros[];
}
