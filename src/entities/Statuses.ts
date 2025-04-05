import { Column, Entity, Index, OneToMany } from "typeorm";
import { BuildRequests } from "./BuildRequests";
import { Features } from "./Features";
import { Licenses } from "./Licenses";
import { Screens } from "./Screens";
import { Subscriptions } from "./Subscriptions";

@Index("statuses_pkey", ["id"], { unique: true })
@Index("statuses_name_key", ["name"], { unique: true })
@Entity("statuses", { schema: "public" })
export class Statuses {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @OneToMany(() => BuildRequests, (buildRequests) => buildRequests.status)
  buildRequests: BuildRequests[];

  @OneToMany(() => Features, (features) => features.status)
  features: Features[];

  @OneToMany(() => Licenses, (licenses) => licenses.status)
  licenses: Licenses[];

  @OneToMany(() => Screens, (screens) => screens.status)
  screens: Screens[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.status)
  subscriptions: Subscriptions[];
}
