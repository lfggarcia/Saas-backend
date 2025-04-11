import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { AppCollaboratorPermissions } from "./AppCollaboratorPermissions";
import { PermissionTypeCatalog } from "./PermissionTypeCatalog";
import { RolePermissions } from "./RolePermissions";

@Index("PK_920331560282b8bd21bb02290df", ["id"], { unique: true })
@Index("permissions_pkey", ["id"], { unique: true })
@Index("permissions_key_key", ["key"], { unique: true })
@Index("UQ_017943867ed5ceef9c03edd9745", ["key"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "key" })
  key: string;

  @Column("text", { name: "label" })
  label: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToOne(
    () => AppCollaboratorPermissions,
    (appCollaboratorPermissions) => appCollaboratorPermissions.permission
  )
  appCollaboratorPermissions: AppCollaboratorPermissions;

  @ManyToOne(
    () => PermissionTypeCatalog,
    (permissionTypeCatalog) => permissionTypeCatalog.permissions
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type: PermissionTypeCatalog;

  @OneToOne(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.permission
  )
  rolePermissions: RolePermissions;
}
