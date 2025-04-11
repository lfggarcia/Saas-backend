import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { FeatureScreens } from "./FeatureScreens";
import { FeatureVersions } from "./FeatureVersions";
import { Navigations } from "./Navigations";

@Index("PK_5c1e336df2f4a7051e5bf08a941", ["id"], { unique: true })
@Index("features_pkey", ["id"], { unique: true })
@Entity("features", { schema: "public" })
export class Features {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "version", nullable: true, default: () => "'1.0.0'" })
  version: string | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(() => FeatureScreens, (featureScreens) => featureScreens.feature)
  featureScreens: FeatureScreens;

  @OneToOne(() => FeatureVersions, (featureVersions) => featureVersions.feature)
  featureVersions: FeatureVersions;

  @ManyToOne(() => Navigations, (navigations) => navigations.features, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "navigation_id", referencedColumnName: "id" }])
  navigation: Navigations;
}
