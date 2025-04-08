import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { UserThemes } from "./UserThemes";
import { GlobalStyleVariantTypes } from "./GlobalStyleVariantTypes";

@Index("user_global_styles_pkey", ["id"], { unique: true })
@Index(
  "user_global_styles_theme_id_variant_type_id_variant_key_key",
  ["themeId", "variantKey", "variantTypeId"],
  { unique: true }
)
@Entity("user_global_styles", { schema: "public" })
export class UserGlobalStyles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id", nullable: true, unique: true })
  themeId: string | null;

  @Column("uuid", { name: "variant_type_id", nullable: true, unique: true })
  variantTypeId: string | null;

  @Column("character varying", {
    name: "variant_key",
    nullable: true,
    unique: true,
    length: 50,
  })
  variantKey: string | null;

  @Column("jsonb", { name: "properties" })
  properties: object;

  @ManyToOne(() => UserThemes, (userThemes) => userThemes.userGlobalStyles)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: UserThemes;

  @ManyToOne(
    () => GlobalStyleVariantTypes,
    (globalStyleVariantTypes) => globalStyleVariantTypes.userGlobalStyles
  )
  @JoinColumn([{ name: "variant_type_id", referencedColumnName: "id" }])
  variantType: GlobalStyleVariantTypes;
}
