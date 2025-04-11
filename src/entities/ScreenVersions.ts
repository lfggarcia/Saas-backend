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
import { Screens } from "./Screens";

@Index("screen_versions_pkey", ["id"], { unique: true })
@Index("PK_697329bffef91fa77460e905597", ["id"], { unique: true })
@Index("screen_versions_screen_id_version_key", ["screenId", "version"], {
  unique: true,
})
@Index("UQ_ced6d7b022074b7821a6501b1ca", ["screenId"], { unique: true })
@Index("UQ_fcb7cad96f4016251e45bb77772", ["version"], { unique: true })
@Entity("screen_versions", { schema: "public" })
export class ScreenVersions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "screen_id", nullable: true })
  screenId: string | null;

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
    (featureVersionScreens) => featureVersionScreens.screenVersion
  )
  featureVersionScreens: FeatureVersionScreens;

  @ManyToOne(() => Users, (users) => users.screenVersions)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: Users;

  @OneToOne(() => Screens, (screens) => screens.screenVersions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "screen_id", referencedColumnName: "id" }])
  screen: Screens;
}
