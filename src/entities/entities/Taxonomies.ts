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
import { TaxonomyTerms } from "./TaxonomyTerms";

@Index("taxonomies_pkey", ["idTaxonomy"], { unique: true })
@Entity("taxonomies", { schema: "public" })
export class Taxonomies {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_taxonomy" })
  idTaxonomy: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(() => Companies, (companies) => companies.taxonomies)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @OneToMany(() => TaxonomyTerms, (taxonomyTerms) => taxonomyTerms.idTaxonomy)
  taxonomyTerms: TaxonomyTerms[];
}
