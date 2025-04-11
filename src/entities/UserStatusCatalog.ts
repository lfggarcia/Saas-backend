import { Column, Entity, Index, OneToMany } from "typeorm";
import { Users } from "./Users";

@Index("PK_a7f03557052702289be59158609", ["id"], { unique: true })
@Index("user_status_catalog_pkey", ["id"], { unique: true })
@Index("user_status_catalog_name_key", ["name"], { unique: true })
@Index("UQ_60e4cceeaa4275065ed34c4bd53", ["name"], { unique: true })
@Entity("user_status_catalog", { schema: "public" })
export class UserStatusCatalog {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Users, (users) => users.status)
  users: Users[];
}
