import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Applications } from "./Applications";
import { Licenses } from "./Licenses";
import { Statuses } from "./Statuses";

@Index("build_requests_pkey", ["id"], { unique: true })
@Entity("build_requests", { schema: "public" })
export class BuildRequests {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "platform", nullable: true, length: 20 })
  platform: string | null;

  @Column("character varying", { name: "version", nullable: true, length: 50 })
  version: string | null;

  @Column("jsonb", { name: "config_snapshot", nullable: true })
  configSnapshot: object | null;

  @Column("text", { name: "log_url", nullable: true })
  logUrl: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Applications, (applications) => applications.buildRequests)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @ManyToOne(() => Licenses, (licenses) => licenses.buildRequests)
  @JoinColumn([{ name: "license_id", referencedColumnName: "id" }])
  license: Licenses;

  @ManyToOne(() => Statuses, (statuses) => statuses.buildRequests)
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: Statuses;
}
