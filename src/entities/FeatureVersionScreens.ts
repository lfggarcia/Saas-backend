import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { FeatureVersions } from "./FeatureVersions";
import { ScreenVersions } from "./ScreenVersions";

@Index(
  "feature_version_screens_feature_version_id_screen_version_i_key",
  ["environment", "featureVersionId", "screenVersionId"],
  { unique: true }
)
@Index("UQ_028d9b4e4a3f3bf4de1575e15b3", ["environment"], { unique: true })
@Index("UQ_0eb95d4a1803a0842b73be75fd1", ["featureVersionId"], { unique: true })
@Index("PK_8663aae95a72f68dd03da397810", ["id"], { unique: true })
@Index("feature_version_screens_pkey", ["id"], { unique: true })
@Index("UQ_4bfa2ecd16365441e4e42006106", ["screenVersionId"], { unique: true })
@Entity("feature_version_screens", { schema: "public" })
export class FeatureVersionScreens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "feature_version_id", nullable: true })
  featureVersionId: string | null;

  @Column("uuid", { name: "screen_version_id", nullable: true })
  screenVersionId: string | null;

  @Column("text", {
    name: "environment",
    nullable: true,
    default: () => "'production'",
  })
  environment: string | null;

  @OneToOne(
    () => FeatureVersions,
    (featureVersions) => featureVersions.featureVersionScreens,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "feature_version_id", referencedColumnName: "id" }])
  featureVersion: FeatureVersions;

  @OneToOne(
    () => ScreenVersions,
    (screenVersions) => screenVersions.featureVersionScreens,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "screen_version_id", referencedColumnName: "id" }])
  screenVersion: ScreenVersions;
}
