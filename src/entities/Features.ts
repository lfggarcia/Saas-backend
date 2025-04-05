import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FeatureVersions } from "./FeatureVersions";
import { Applications } from "./Applications";
import { Statuses } from "./Statuses";

@Index("features_pkey", ["id"], { unique: true })
@Entity("features", { schema: "public" })
export class Features {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

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

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("boolean", {
    name: "preloaded",
    nullable: true,
    default: () => "false",
  })
  preloaded: boolean | null;

  @OneToMany(
    () => FeatureVersions,
    (featureVersions) => featureVersions.feature
  )
  featureVersions: FeatureVersions[];

  @OneToMany(
    () => FeatureVersions,
    (featureVersions) => featureVersions.replacesFeature
  )
  featureVersions2: FeatureVersions[];

  @ManyToOne(() => Applications, (applications) => applications.features)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @ManyToOne(() => Statuses, (statuses) => statuses.features)
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: Statuses;
}
