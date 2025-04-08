import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserGlobalStyles } from "./UserGlobalStyles";

@Index("global_style_variant_types_pkey", ["id"], { unique: true })
@Index("global_style_variant_types_name_key", ["name"], { unique: true })
@Entity("global_style_variant_types", { schema: "public" })
export class GlobalStyleVariantTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => UserGlobalStyles,
    (userGlobalStyles) => userGlobalStyles.variantType
  )
  userGlobalStyles: UserGlobalStyles[];
}
