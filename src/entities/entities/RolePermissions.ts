import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

@Index("role_permissions_pkey", ["idRolePermission"], { unique: true })
@Entity("role_permissions", { schema: "public" })
export class RolePermissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_role_permission" })
  idRolePermission: number;

  @ManyToOne(() => Permissions, (permissions) => permissions.rolePermissions)
  @JoinColumn([{ name: "id_permission", referencedColumnName: "idPermission" }])
  idPermission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.rolePermissions)
  @JoinColumn([{ name: "id_role", referencedColumnName: "idRole" }])
  idRole: Roles;
}
