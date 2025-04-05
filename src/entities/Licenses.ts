import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BuildRequests } from "./BuildRequests";
import { Applications } from "./Applications";
import { Statuses } from "./Statuses";

@Index("licenses_pkey", ["id"], { unique: true })
@Index("licenses_key_key", ["key"], { unique: true })
@Entity("licenses", { schema: "public" })
export class Licenses {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "key", unique: true, length: 255 })
  key: string;

  @Column("character varying", { name: "bundle_id", length: 255 })
  bundleId: string;

  @Column("timestamp without time zone", { name: "expires_at", nullable: true })
  expiresAt: Date | null;

  @Column("integer", { name: "user_limit", nullable: true })
  userLimit: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => BuildRequests, (buildRequests) => buildRequests.license)
  buildRequests: BuildRequests[];

  @ManyToOne(() => Applications, (applications) => applications.licenses)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @ManyToOne(() => Statuses, (statuses) => statuses.licenses)
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: Statuses;
}
