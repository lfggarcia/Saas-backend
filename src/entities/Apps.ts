import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { AppCollaborators } from "./AppCollaborators";
import { Users } from "./Users";
import { Navigations } from "./Navigations";

@Index("apps_pkey", ["id"], { unique: true })
@Index("PK_c5121fda0f8268f1f7f84134e19", ["id"], { unique: true })
@Entity("apps", { schema: "public" })
export class Apps {
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

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(() => AppCollaborators, (appCollaborators) => appCollaborators.app)
  appCollaborators: AppCollaborators;

  @ManyToOne(() => Users, (users) => users.apps, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToOne(() => Navigations, (navigations) => navigations.app)
  navigations: Navigations;
}
