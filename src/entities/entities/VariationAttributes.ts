import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VariationAttributeValues } from "./VariationAttributeValues";
import { Companies } from "./Companies";

@Index("variation_attributes_pkey", ["idAttribute"], { unique: true })
@Entity("variation_attributes", { schema: "public" })
export class VariationAttributes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_attribute" })
  idAttribute: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(
    () => VariationAttributeValues,
    (variationAttributeValues) => variationAttributeValues.idAttribute
  )
  variationAttributeValues: VariationAttributeValues[];

  @ManyToOne(() => Companies, (companies) => companies.variationAttributes)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;
}
