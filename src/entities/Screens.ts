import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ScreenVersions } from "./ScreenVersions";
import { FeatureVersions } from "./FeatureVersions";
import { Statuses } from "./Statuses";

@Index("screens_pkey", ["id"], { unique: true })
@Entity("screens", { schema: "public" })
export class Screens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", {
    name: "route_name",
    nullable: true,
    length: 255,
  })
  routeName: string | null;

  @Column("boolean", {
    name: "preload",
    nullable: true,
    default: () => "false",
  })
  preload: boolean | null;

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

  @OneToMany(() => ScreenVersions, (screenVersions) => screenVersions.screen)
  screenVersions: ScreenVersions[];

  @ManyToOne(
    () => FeatureVersions,
    (featureVersions) => featureVersions.screens
  )
  @JoinColumn([{ name: "feature_version_id", referencedColumnName: "id" }])
  featureVersion: FeatureVersions;

  @ManyToOne(() => Statuses, (statuses) => statuses.screens)
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: Statuses;
}
