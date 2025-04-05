import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Plans } from "./Plans";
import { Statuses } from "./Statuses";
import { Users } from "./Users";

@Index("subscriptions_pkey", ["id"], { unique: true })
@Entity("subscriptions", { schema: "public" })
export class Subscriptions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("timestamp without time zone", { name: "started_at", nullable: true })
  startedAt: Date | null;

  @Column("timestamp without time zone", { name: "ended_at", nullable: true })
  endedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Plans, (plans) => plans.subscriptions)
  @JoinColumn([{ name: "plan_id", referencedColumnName: "id" }])
  plan: Plans;

  @ManyToOne(() => Statuses, (statuses) => statuses.subscriptions)
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: Statuses;

  @ManyToOne(() => Users, (users) => users.subscriptions)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
