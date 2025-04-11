import { Column, Entity, Index, OneToMany } from "typeorm";
import { Permissions } from "./Permissions";

@Index("permission_type_catalog_pkey", ["id"], { unique: true })
@Index("PK_141a4eb071f81933e738d252742", ["id"], { unique: true })
@Index("permission_type_catalog_name_key", ["name"], { unique: true })
@Index("UQ_5e25626b2ddae3aeaeff44ec9b6", ["name"], { unique: true })
@Entity("permission_type_catalog", { schema: "public" })
export class PermissionTypeCatalog {
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

  @OneToMany(() => Permissions, (permissions) => permissions.type)
  permissions: Permissions[];
}
