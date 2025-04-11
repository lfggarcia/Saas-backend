import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Features } from "./Features";
import { Screens } from "./Screens";

@Index(
  "feature_screens_feature_id_screen_id_environment_key",
  ["environment", "featureId", "screenId"],
  { unique: true }
)
@Index("UQ_12d3511f60de1884dfee5f7d03d", ["environment"], { unique: true })
@Index("UQ_a0fcf03dec11b836ceb1f7a8086", ["featureId"], { unique: true })
@Index("PK_d8e130096553132e1386607161f", ["id"], { unique: true })
@Index("feature_screens_pkey", ["id"], { unique: true })
@Index("UQ_8c438b897c93d9c11d2b367e9eb", ["screenId"], { unique: true })
@Entity("feature_screens", { schema: "public" })
export class FeatureScreens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "feature_id", nullable: true })
  featureId: string | null;

  @Column("uuid", { name: "screen_id", nullable: true })
  screenId: string | null;

  @Column("text", {
    name: "environment",
    nullable: true,
    default: () => "'production'",
  })
  environment: string | null;

  @OneToOne(() => Features, (features) => features.featureScreens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "feature_id", referencedColumnName: "id" }])
  feature: Features;

  @OneToOne(() => Screens, (screens) => screens.featureScreens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "screen_id", referencedColumnName: "id" }])
  screen: Screens;
}
