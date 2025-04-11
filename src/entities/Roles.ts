import { Column, Entity, Index, OneToOne } from "typeorm";
import { RolePermissions } from "./RolePermissions";
import { UserRoles } from "./UserRoles";

@Index("roles_pkey", ["id"], { unique: true })
@Index("PK_c1433d71a4838793a49dcad46ab", ["id"], { unique: true })
@Index("roles_name_key", ["name"], { unique: true })
@Index("UQ_648e3f5447f725579d7d4ffdfb7", ["name"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
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

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(() => RolePermissions, (rolePermissions) => rolePermissions.role)
  rolePermissions: RolePermissions;

  @OneToOne(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles;
}
