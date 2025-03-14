import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("user_roles_pkey", ["idUserRole"], { unique: true })
@Entity("user_roles", { schema: "public" })
export class UserRoles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_user_role" })
  idUserRole: number;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "id_role", referencedColumnName: "idRole" }])
  idRole: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}
