import { Column, Entity, Index, OneToMany } from "typeorm";
import { StyleVariantProperties } from "./StyleVariantProperties";

@Index("style_variants_pkey", ["id"], { unique: true })
@Index("style_variants_name_level_key", ["level", "name"], { unique: true })
@Entity("style_variants", { schema: "public" })
export class StyleVariants {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("integer", { name: "level", unique: true })
  level: number;

  @OneToMany(
    () => StyleVariantProperties,
    (styleVariantProperties) => styleVariantProperties.variant
  )
  styleVariantProperties: StyleVariantProperties[];
}
