import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AppCollaborators } from "./AppCollaborators";
import { Apps } from "./Apps";
import { FeatureVersions } from "./FeatureVersions";
import { ScreenVersions } from "./ScreenVersions";
import { Sessions } from "./Sessions";
import { TranslationKeys } from "./TranslationKeys";
import { UserAliases } from "./UserAliases";
import { UserLanguages } from "./UserLanguages";
import { UserRoles } from "./UserRoles";
import { UserThemes } from "./UserThemes";
import { UserTokens } from "./UserTokens";
import { UserStatusCatalog } from "./UserStatusCatalog";

@Index("UQ_97672ac88f789774dd47f7c8be3", ["email"], { unique: true })
@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("PK_a3ffb1c0c8416b9fc6f907b7433", ["id"], { unique: true })
@Index("users_username_key", ["username"], { unique: true })
@Index("UQ_fe0bb3f6520ee0469504521e710", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "username" })
  username: string;

  @Column("text", { name: "email" })
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

  @OneToOne(() => AppCollaborators, (appCollaborators) => appCollaborators.user)
  appCollaborators: AppCollaborators;

  @OneToMany(() => Apps, (apps) => apps.user)
  apps: Apps[];

  @OneToMany(
    () => FeatureVersions,
    (featureVersions) => featureVersions.createdBy
  )
  featureVersions: FeatureVersions[];

  @OneToMany(
    () => FeatureVersions,
    (featureVersions) => featureVersions.updatedBy
  )
  featureVersions2: FeatureVersions[];

  @OneToMany(() => ScreenVersions, (screenVersions) => screenVersions.createdBy)
  screenVersions: ScreenVersions[];

  @OneToMany(() => Sessions, (sessions) => sessions.user)
  sessions: Sessions[];

  @OneToOne(() => TranslationKeys, (translationKeys) => translationKeys.user)
  translationKeys: TranslationKeys;

  @OneToOne(() => UserAliases, (userAliases) => userAliases.user)
  userAliases: UserAliases;

  @OneToOne(() => UserLanguages, (userLanguages) => userLanguages.user)
  userLanguages: UserLanguages;

  @OneToOne(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles;

  @OneToMany(() => UserThemes, (userThemes) => userThemes.updatedBy)
  userThemes: UserThemes[];

  @OneToMany(() => UserThemes, (userThemes) => userThemes.user)
  userThemes2: UserThemes[];

  @OneToMany(() => UserTokens, (userTokens) => userTokens.updatedBy)
  userTokens: UserTokens[];

  @OneToOne(() => UserTokens, (userTokens) => userTokens.user)
  userTokens2: UserTokens;

  @ManyToOne(
    () => UserStatusCatalog,
    (userStatusCatalog) => userStatusCatalog.users
  )
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: UserStatusCatalog;
}
