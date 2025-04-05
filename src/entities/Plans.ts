import { Column, Entity, Index, OneToMany } from "typeorm";
import { Subscriptions } from "./Subscriptions";
import { Users } from "./Users";

@Index("plans_pkey", ["id"], { unique: true })
@Entity("plans", { schema: "public" })
export class Plans {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("integer", { name: "max_apps" })
  maxApps: number;

  @Column("integer", { name: "max_features" })
  maxFeatures: number;

  @Column("integer", { name: "max_screens_per_feature" })
  maxScreensPerFeature: number;

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

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.plan)
  subscriptions: Subscriptions[];

  @OneToMany(() => Users, (users) => users.plan)
  users: Users[];
}
