import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserAliases } from "./UserAliases";

@Index("style_aliases_pkey", ["id"], { unique: true })
@Index("style_aliases_short_key_key", ["shortKey"], { unique: true })
@Entity("style_aliases", { schema: "public" })
export class StyleAliases {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "short_key", unique: true, length: 50 })
  shortKey: string;

  @Column("character varying", { name: "property_name", length: 100 })
  propertyName: string;

  @OneToMany(() => UserAliases, (userAliases) => userAliases.alias)
  userAliases: UserAliases[];
}
