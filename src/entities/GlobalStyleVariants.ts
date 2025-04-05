import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GlobalStyles } from "./GlobalStyles";

@Index(
  "global_style_variants_global_style_id_variant_name_key",
  ["globalStyleId", "variantName"],
  { unique: true }
)
@Index("global_style_variants_pkey", ["id"], { unique: true })
@Entity("global_style_variants", { schema: "public" })
export class GlobalStyleVariants {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "global_style_id", unique: true })
  globalStyleId: string;

  @Column("character varying", {
    name: "variant_name",
    unique: true,
    length: 50,
  })
  variantName: string;

  @Column("jsonb", { name: "properties" })
  properties: object;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(
    () => GlobalStyles,
    (globalStyles) => globalStyles.globalStyleVariants
  )
  @JoinColumn([{ name: "global_style_id", referencedColumnName: "id" }])
  globalStyle: GlobalStyles;
}
