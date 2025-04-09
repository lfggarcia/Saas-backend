import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Sessions } from "./Sessions";
import { TranslationKeys } from "./TranslationKeys";
import { UserAliases } from "./UserAliases";
import { UserLanguages } from "./UserLanguages";
import { UserRoles } from "./UserRoles";
import { UserStatusCatalog } from "./UserStatusCatalog";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("users_username_key", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "username", unique: true })
  username: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "full_name", nullable: true })
  fullName: string | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @OneToMany(() => Sessions, (sessions) => sessions.user)
  sessions: Sessions[];

  @OneToMany(() => TranslationKeys, (translationKeys) => translationKeys.user)
  translationKeys: TranslationKeys[];

  @OneToMany(() => UserAliases, (userAliases) => userAliases.user)
  userAliases: UserAliases[];

  @OneToMany(() => UserLanguages, (userLanguages) => userLanguages.user)
  userLanguages: UserLanguages[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles[];

  @ManyToOne(
    () => UserStatusCatalog,
    (userStatusCatalog) => userStatusCatalog.users
  )
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: UserStatusCatalog;
}
