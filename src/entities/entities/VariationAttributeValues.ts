import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductVariations } from "./ProductVariations";
import { VariationAttributes } from "./VariationAttributes";

@Index("variation_attribute_values_pkey", ["idAttributeValue"], {
  unique: true,
})
@Entity("variation_attribute_values", { schema: "public" })
export class VariationAttributeValues {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_attribute_value" })
  idAttributeValue: number;

  @Column("character varying", { name: "value", length: 50 })
  value: string;

  @ManyToMany(
    () => ProductVariations,
    (productVariations) => productVariations.variationAttributeValues
  )
  @JoinTable({
    name: "variation_attribute_combinations",
    joinColumns: [
      { name: "id_attribute_value", referencedColumnName: "idAttributeValue" },
    ],
    inverseJoinColumns: [
      { name: "id_variation", referencedColumnName: "idVariation" },
    ],
    schema: "public",
  })
  productVariations: ProductVariations[];

  @ManyToOne(
    () => VariationAttributes,
    (variationAttributes) => variationAttributes.variationAttributeValues
  )
  @JoinColumn([{ name: "id_attribute", referencedColumnName: "idAttribute" }])
  idAttribute: VariationAttributes;
}
