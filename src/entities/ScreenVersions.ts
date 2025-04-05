import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ScreenComponents } from "./ScreenComponents";
import { Screens } from "./Screens";

@Index("screen_versions_pkey", ["id"], { unique: true })
@Entity("screen_versions", { schema: "public" })
export class ScreenVersions {
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

  @OneToMany(
    () => ScreenComponents,
    (screenComponents) => screenComponents.screenVersion
  )
  screenComponents: ScreenComponents[];

  @ManyToOne(() => Screens, (screens) => screens.screenVersions)
  @JoinColumn([{ name: "screen_id", referencedColumnName: "id" }])
  screen: Screens;
}
