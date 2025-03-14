import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolePermissions } from "./RolePermissions";
import { UserRoles } from "./UserRoles";

@Index("roles_pkey", ["idRole"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_role" })
  idRole: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.idRole)
  rolePermissions: RolePermissions[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.idRole)
  userRoles: UserRoles[];
}
