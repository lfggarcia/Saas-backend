import { Column, Entity, Index, OneToMany } from "typeorm";
import { Permissions } from "./Permissions";

@Index("permission_type_catalog_pkey", ["id"], { unique: true })
@Index("permission_type_catalog_name_key", ["name"], { unique: true })
@Entity("permission_type_catalog", { schema: "public" })
export class PermissionTypeCatalog {
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

  @OneToMany(() => Permissions, (permissions) => permissions.type)
  permissions: Permissions[];
}
