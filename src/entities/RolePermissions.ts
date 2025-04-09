import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

@Index("role_permissions_pkey", ["id"], { unique: true })
@Index(
  "role_permissions_role_id_permission_id_key",
  ["permissionId", "roleId"],
  { unique: true }
)
@Entity("role_permissions", { schema: "public" })
export class RolePermissions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "role_id", unique: true })
  roleId: string;

  @Column("uuid", { name: "permission_id", unique: true })
  permissionId: string;

  @Column("timestamp with time zone", {
    name: "granted_at",
    nullable: true,
    default: () => "now()",
  })
  grantedAt: Date | null;

  @ManyToOne(() => Permissions, (permissions) => permissions.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
