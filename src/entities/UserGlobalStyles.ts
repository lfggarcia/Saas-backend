import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { UserThemes } from "./UserThemes";
import { GlobalStyleVariantTypes } from "./GlobalStyleVariantTypes";

@Index("PK_a3f05e8cf0178da02449783ed47", ["id"], { unique: true })
@Index("user_global_styles_pkey", ["id"], { unique: true })
@Index(
  "user_global_styles_theme_id_variant_type_id_variant_key_key",
  ["themeId", "variantKey", "variantTypeId"],
  { unique: true }
)
@Index("idx_user_global_styles_theme_variant", ["themeId", "variantTypeId"], {})
@Index("UQ_185e624a4bc39128ec476a0ac5e", ["themeId"], { unique: true })
@Index("UQ_077737d041e870609202c619e73", ["variantKey"], { unique: true })
@Index("UQ_249aa6698b54cf1a9fe540df998", ["variantTypeId"], { unique: true })
@Entity("user_global_styles", { schema: "public" })
export class UserGlobalStyles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id", nullable: true })
  themeId: string | null;

  @Column("uuid", { name: "variant_type_id", nullable: true })
  variantTypeId: string | null;

  @Column("character varying", {
    name: "variant_key",
    nullable: true,
    length: 50,
  })
  variantKey: string | null;

  @Column("jsonb", { name: "properties" })
  properties: object;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(() => UserThemes, (userThemes) => userThemes.userGlobalStyles)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: UserThemes;

  @OneToOne(
    () => GlobalStyleVariantTypes,
    (globalStyleVariantTypes) => globalStyleVariantTypes.userGlobalStyles
  )
  @JoinColumn([{ name: "variant_type_id", referencedColumnName: "id" }])
  variantType: GlobalStyleVariantTypes;
}
