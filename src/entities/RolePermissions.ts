import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

@Index("role_permissions_pkey", ["id"], { unique: true })
@Index("PK_84059017c90bfcb701b8fa42297", ["id"], { unique: true })
@Index(
  "role_permissions_role_id_permission_id_key",
  ["permissionId", "roleId"],
  { unique: true }
)
@Index("UQ_17022daf3f885f7d35423e9971e", ["permissionId"], { unique: true })
@Index("UQ_178199805b901ccd220ab7740ec", ["roleId"], { unique: true })
@Entity("role_permissions", { schema: "public" })
export class RolePermissions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "role_id" })
  roleId: string;

  @Column("uuid", { name: "permission_id" })
  permissionId: string;

  @Column("timestamp with time zone", {
    name: "granted_at",
    nullable: true,
    default: () => "now()",
  })
  grantedAt: Date | null;

  @OneToOne(() => Permissions, (permissions) => permissions.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @OneToOne(() => Roles, (roles) => roles.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
