import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { StyleAliases } from "./StyleAliases";
import { Users } from "./Users";

@Index("PK_d9d1cde77cac5f8e90f45ac7cb7", ["id"], { unique: true })
@Index("user_aliases_pkey", ["id"], { unique: true })
@Index("UQ_54d6679d5e1e061b50025113781", ["shortKey"], { unique: true })
@Index("user_aliases_user_id_short_key_key", ["shortKey", "userId"], {
  unique: true,
})
@Index("UQ_4f813c49329afad212db1d8def4", ["userId"], { unique: true })
@Entity("user_aliases", { schema: "public" })
export class UserAliases {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("character varying", { name: "short_key", length: 50 })
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

  @OneToOne(() => Users, (users) => users.userAliases, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
