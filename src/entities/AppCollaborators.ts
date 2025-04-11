import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { AppCollaboratorPermissions } from "./AppCollaboratorPermissions";
import { Apps } from "./Apps";
import { CollaboratorRoles } from "./CollaboratorRoles";
import { Users } from "./Users";

@Index("UQ_b8993a2dc0acbcc49fcf057bd97", ["appId"], { unique: true })
@Index("app_collaborators_app_id_user_id_key", ["appId", "userId"], {
  unique: true,
})
@Index("app_collaborators_pkey", ["id"], { unique: true })
@Index("PK_f070c66d4fbf47fe6f296a6a548", ["id"], { unique: true })
@Index("UQ_a699e4df719e785388cfb81ac02", ["userId"], { unique: true })
@Entity("app_collaborators", { schema: "public" })
export class AppCollaborators {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "app_id", nullable: true })
  appId: string | null;

  @Column("uuid", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("timestamp without time zone", {
    name: "added_at",
    nullable: true,
    default: () => "now()",
  })
  addedAt: Date | null;

  @OneToOne(
    () => AppCollaboratorPermissions,
    (appCollaboratorPermissions) => appCollaboratorPermissions.collaborator
  )
  appCollaboratorPermissions: AppCollaboratorPermissions;

  @OneToOne(() => Apps, (apps) => apps.appCollaborators, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "app_id", referencedColumnName: "id" }])
  app: Apps;

  @ManyToOne(
    () => CollaboratorRoles,
    (collaboratorRoles) => collaboratorRoles.appCollaborators
  )
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: CollaboratorRoles;

  @OneToOne(() => Users, (users) => users.appCollaborators, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
