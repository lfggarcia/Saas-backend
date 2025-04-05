import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Applications } from "./Applications";
import { CustomTokens } from "./CustomTokens";
import { Subscriptions } from "./Subscriptions";
import { Plans } from "./Plans";
import { Roles } from "./Roles";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("character varying", { name: "password", length: 255 })
  password: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("uuid", { name: "client_id", nullable: true })
  clientId: string | null;

  @OneToMany(() => Applications, (applications) => applications.user)
  applications: Applications[];

  @OneToMany(() => CustomTokens, (customTokens) => customTokens.user)
  customTokens: CustomTokens[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.user)
  subscriptions: Subscriptions[];

  @ManyToOne(() => Plans, (plans) => plans.users)
  @JoinColumn([{ name: "plan_id", referencedColumnName: "id" }])
  plan: Plans;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
