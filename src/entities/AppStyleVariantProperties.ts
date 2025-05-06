import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AppStyleVariants } from "./AppStyleVariants";

@Index(
  "app_style_variant_properties_app_variant_id_property_name_key",
  ["appVariantId", "propertyName"],
  { unique: true }
)
@Index("app_style_variant_properties_pkey", ["id"], { unique: true })
@Entity("app_style_variant_properties", { schema: "public" })
export class AppStyleVariantProperties {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "app_variant_id", nullable: true, unique: true })
  appVariantId: string | null;

  @Column("character varying", {
    name: "property_name",
    unique: true,
    length: 100,
  })
  propertyName: string;

  @Column("text", { name: "value" })
  value: string;

  @ManyToOne(
    () => AppStyleVariants,
    (appStyleVariants) => appStyleVariants.appStyleVariantProperties,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "app_variant_id", referencedColumnName: "id" }])
  appVariant: AppStyleVariants;
}
