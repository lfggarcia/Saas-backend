import { Column, Entity, Index, OneToOne } from "typeorm";
import { FeatureScreens } from "./FeatureScreens";
import { ScreenComponents } from "./ScreenComponents";
import { ScreenVersions } from "./ScreenVersions";

@Index("PK_15b65ed44367c5411efccdd7de1", ["id"], { unique: true })
@Index("screens_pkey", ["id"], { unique: true })
@Entity("screens", { schema: "public" })
export class Screens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("boolean", {
    name: "is_global",
    nullable: true,
    default: () => "false",
  })
  isGlobal: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(() => FeatureScreens, (featureScreens) => featureScreens.screen)
  featureScreens: FeatureScreens;

  @OneToOne(
    () => ScreenComponents,
    (screenComponents) => screenComponents.screen
  )
  screenComponents: ScreenComponents;

  @OneToOne(() => ScreenVersions, (screenVersions) => screenVersions.screen)
  screenVersions: ScreenVersions;
}
