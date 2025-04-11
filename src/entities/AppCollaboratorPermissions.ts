import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { AppCollaborators } from "./AppCollaborators";
import { Permissions } from "./Permissions";

@Index("UQ_4e17c837734c7990dd53e31a932", ["collaboratorId"], { unique: true })
@Index(
  "app_collaborator_permissions_collaborator_id_permission_id_key",
  ["collaboratorId", "permissionId"],
  { unique: true }
)
@Index("app_collaborator_permissions_pkey", ["id"], { unique: true })
@Index("PK_be6d4d23efea145299137936089", ["id"], { unique: true })
@Index("UQ_98d02700a43eb716425a6d6ed4e", ["permissionId"], { unique: true })
@Entity("app_collaborator_permissions", { schema: "public" })
export class AppCollaboratorPermissions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "collaborator_id", nullable: true })
  collaboratorId: string | null;

  @Column("uuid", { name: "permission_id", nullable: true })
  permissionId: string | null;

  @Column("timestamp without time zone", {
    name: "granted_at",
    nullable: true,
    default: () => "now()",
  })
  grantedAt: Date | null;

  @OneToOne(
    () => AppCollaborators,
    (appCollaborators) => appCollaborators.appCollaboratorPermissions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "collaborator_id", referencedColumnName: "id" }])
  collaborator: AppCollaborators;

  @OneToOne(
    () => Permissions,
    (permissions) => permissions.appCollaboratorPermissions
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;
}
