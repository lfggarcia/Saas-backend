import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ModulePermissions } from "./ModulePermissions";
import { RolePermissions } from "./RolePermissions";

@Index("permissions_pkey", ["idPermission"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_permission" })
  idPermission: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => ModulePermissions,
    (modulePermissions) => modulePermissions.idPermission
  )
  modulePermissions: ModulePermissions[];

  @OneToMany(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.idPermission
  )
  rolePermissions: RolePermissions[];
}
