import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { TokenGroups } from "./TokenGroups";

@Index("aliases_pkey", ["id"], { unique: true })
@Index("aliases_name_key", ["name"], { unique: true })
@Entity("aliases", { schema: "public" })
export class Aliases {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("character varying", { name: "property", length: 50 })
  property: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @ManyToMany(() => TokenGroups, (tokenGroups) => tokenGroups.aliases)
  @JoinTable({
    name: "token_group_aliases",
    joinColumns: [{ name: "alias_id", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "token_group_id", referencedColumnName: "id" },
    ],
    schema: "public",
  })
  tokenGroups: TokenGroups[];
}
