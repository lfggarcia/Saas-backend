import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { StyleVariants } from "./StyleVariants";

@Index("style_variant_properties_pkey", ["id"], { unique: true })
@Index(
  "style_variant_properties_variant_id_property_name_key",
  ["propertyName", "variantId"],
  { unique: true }
)
@Entity("style_variant_properties", { schema: "public" })
export class StyleVariantProperties {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "variant_id", nullable: true, unique: true })
  variantId: string | null;

  @Column("character varying", {
    name: "property_name",
    unique: true,
    length: 100,
  })
  propertyName: string;

  @Column("text", { name: "value" })
  value: string;

  @ManyToOne(
    () => StyleVariants,
    (styleVariants) => styleVariants.styleVariantProperties,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "id" }])
  variant: StyleVariants;
}
