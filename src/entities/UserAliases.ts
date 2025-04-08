import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { StyleAliases } from "./StyleAliases";

@Index("user_aliases_pkey", ["id"], { unique: true })
@Index("user_aliases_user_id_short_key_key", ["shortKey", "userId"], {
  unique: true,
})
@Entity("user_aliases", { schema: "public" })
export class UserAliases {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("character varying", { name: "short_key", unique: true, length: 50 })
  shortKey: string;

  @Column("character varying", {
    name: "property_override",
    nullable: true,
    length: 100,
  })
  propertyOverride: string | null;

  @ManyToOne(() => StyleAliases, (styleAliases) => styleAliases.userAliases)
  @JoinColumn([{ name: "alias_id", referencedColumnName: "id" }])
  alias: StyleAliases;
}
