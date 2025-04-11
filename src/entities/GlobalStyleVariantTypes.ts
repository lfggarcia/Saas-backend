import { Column, Entity, Index, OneToOne } from "typeorm";
import { UserGlobalStyles } from "./UserGlobalStyles";

@Index("global_style_variant_types_pkey", ["id"], { unique: true })
@Index("PK_9c005d02c8b7e25353c9f5c482e", ["id"], { unique: true })
@Index("global_style_variant_types_name_key", ["name"], { unique: true })
@Index("UQ_6a96e901a6e79bf2b465684e691", ["name"], { unique: true })
@Entity("global_style_variant_types", { schema: "public" })
export class GlobalStyleVariantTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToOne(
    () => UserGlobalStyles,
    (userGlobalStyles) => userGlobalStyles.variantType
  )
  userGlobalStyles: UserGlobalStyles;
}
