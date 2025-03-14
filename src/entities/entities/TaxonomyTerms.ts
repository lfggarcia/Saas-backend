import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Taxonomies } from "./Taxonomies";

@Index("taxonomy_terms_pkey", ["idTerm"], { unique: true })
@Entity("taxonomy_terms", { schema: "public" })
export class TaxonomyTerms {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_term" })
  idTerm: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToMany(() => Products, (products) => products.taxonomyTerms)
  products: Products[];

  @ManyToOne(() => Taxonomies, (taxonomies) => taxonomies.taxonomyTerms)
  @JoinColumn([{ name: "id_taxonomy", referencedColumnName: "idTaxonomy" }])
  idTaxonomy: Taxonomies;

  @ManyToOne(
    () => TaxonomyTerms,
    (taxonomyTerms) => taxonomyTerms.taxonomyTerms
  )
  @JoinColumn([{ name: "parent_term_id", referencedColumnName: "idTerm" }])
  parentTerm: TaxonomyTerms;

  @OneToMany(() => TaxonomyTerms, (taxonomyTerms) => taxonomyTerms.parentTerm)
  taxonomyTerms: TaxonomyTerms[];
}
