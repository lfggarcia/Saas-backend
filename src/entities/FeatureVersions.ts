import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { FeatureVersionScreens } from "./FeatureVersionScreens";
import { Users } from "./Users";
import { Features } from "./Features";

@Index("UQ_e1e7e7622a3215a403327f6ca5b", ["featureId"], { unique: true })
@Index("feature_versions_feature_id_version_key", ["featureId", "version"], {
  unique: true,
})
@Index("feature_versions_pkey", ["id"], { unique: true })
@Index("PK_caa5758e5f0f182ee92a07f0ed0", ["id"], { unique: true })
@Index("UQ_199d1951d72972e75f2d6915996", ["version"], { unique: true })
@Entity("feature_versions", { schema: "public" })
export class FeatureVersions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "feature_id", nullable: true })
  featureId: string | null;

  @Column("text", { name: "version" })
  version: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("boolean", {
    name: "is_published",
    nullable: true,
    default: () => "false",
  })
  isPublished: boolean | null;

  @OneToOne(
    () => FeatureVersionScreens,
    (featureVersionScreens) => featureVersionScreens.featureVersion
  )
  featureVersionScreens: FeatureVersionScreens;

  @ManyToOne(() => Users, (users) => users.featureVersions)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: Users;

  @OneToOne(() => Features, (features) => features.featureVersions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "feature_id", referencedColumnName: "id" }])
  feature: Features;

  @ManyToOne(() => Users, (users) => users.featureVersions2)
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy: Users;
}
