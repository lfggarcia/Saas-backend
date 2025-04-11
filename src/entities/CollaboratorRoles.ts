import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppCollaborators } from "./AppCollaborators";

@Index("PK_d02fedc00b3a4836ac54edc151c", ["id"], { unique: true })
@Index("collaborator_roles_pkey", ["id"], { unique: true })
@Index("collaborator_roles_name_key", ["name"], { unique: true })
@Index("UQ_56377b9abd78a5cd06cc8febc99", ["name"], { unique: true })
@Entity("collaborator_roles", { schema: "public" })
export class CollaboratorRoles {
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

  @OneToMany(
    () => AppCollaborators,
    (appCollaborators) => appCollaborators.role
  )
  appCollaborators: AppCollaborators[];
}
