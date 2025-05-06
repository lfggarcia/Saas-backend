import { Column, Entity, Index } from "typeorm";

@Index("property_aliases_alias_key", ["alias"], { unique: true })
@Index("property_aliases_pkey", ["id"], { unique: true })
@Entity("property_aliases", { schema: "public" })
export class PropertyAliases {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "alias", unique: true, length: 50 })
  alias: string;

  @Column("character varying", { name: "maps_to", length: 50 })
  mapsTo: string;
}
