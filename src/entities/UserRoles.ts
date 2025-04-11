import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("user_roles_pkey", ["id"], { unique: true })
@Index("PK_8acd5cf26ebd158416f477de799", ["id"], { unique: true })
@Index("UQ_b23c65e50a758245a33ee35fda1", ["roleId"], { unique: true })
@Index("user_roles_user_id_role_id_key", ["roleId", "userId"], { unique: true })
@Index("UQ_87b8888186ca9769c960e926870", ["userId"], { unique: true })
@Entity("user_roles", { schema: "public" })
export class UserRoles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("uuid", { name: "role_id" })
  roleId: string;

  @Column("timestamp with time zone", {
    name: "assigned_at",
    nullable: true,
    default: () => "now()",
  })
  assignedAt: Date | null;

  @OneToOne(() => Roles, (roles) => roles.userRoles, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;

  @OneToOne(() => Users, (users) => users.userRoles, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
