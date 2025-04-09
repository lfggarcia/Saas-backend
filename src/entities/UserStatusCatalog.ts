import { Column, Entity, Index, OneToMany } from "typeorm";
import { Users } from "./Users";

@Index("user_status_catalog_pkey", ["id"], { unique: true })
@Index("user_status_catalog_name_key", ["name"], { unique: true })
@Entity("user_status_catalog", { schema: "public" })
export class UserStatusCatalog {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name", unique: true })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Users, (users) => users.status)
  users: Users[];
}
