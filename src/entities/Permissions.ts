import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PermissionTypeCatalog } from "./PermissionTypeCatalog";
import { RolePermissions } from "./RolePermissions";

@Index("permissions_pkey", ["id"], { unique: true })
@Index("permissions_key_key", ["key"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "key", unique: true })
  key: string;

  @Column("text", { name: "label" })
  label: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(
    () => PermissionTypeCatalog,
    (permissionTypeCatalog) => permissionTypeCatalog.permissions
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type: PermissionTypeCatalog;

  @OneToMany(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.permission
  )
  rolePermissions: RolePermissions[];
}
