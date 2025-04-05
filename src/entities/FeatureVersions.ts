import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Features } from "./Features";
import { Screens } from "./Screens";

@Index("feature_versions_pkey", ["id"], { unique: true })
@Entity("feature_versions", { schema: "public" })
export class FeatureVersions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "version", length: 255 })
  version: string;

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

  @ManyToOne(() => Features, (features) => features.featureVersions)
  @JoinColumn([{ name: "feature_id", referencedColumnName: "id" }])
  feature: Features;

  @ManyToOne(() => Features, (features) => features.featureVersions2)
  @JoinColumn([{ name: "replaces_feature_id", referencedColumnName: "id" }])
  replacesFeature: Features;

  @OneToMany(() => Screens, (screens) => screens.featureVersion)
  screens: Screens[];
}
