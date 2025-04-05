import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AndroidConfigs } from "./AndroidConfigs";
import { Users } from "./Users";
import { BuildRequests } from "./BuildRequests";
import { Features } from "./Features";
import { IosConfigs } from "./IosConfigs";
import { Languages } from "./Languages";
import { Licenses } from "./Licenses";
import { Stores } from "./Stores";
import { Themes } from "./Themes";
import { TranslationKeys } from "./TranslationKeys";

@Index("applications_bundle_id_key", ["bundleId"], { unique: true })
@Index("applications_pkey", ["id"], { unique: true })
@Entity("applications", { schema: "public" })
export class Applications {
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

  @Column("character varying", {
    name: "bundle_id",
    nullable: true,
    unique: true,
    length: 255,
  })
  bundleId: string | null;

  @OneToMany(
    () => AndroidConfigs,
    (androidConfigs) => androidConfigs.application
  )
  androidConfigs: AndroidConfigs[];

  @ManyToOne(() => Users, (users) => users.applications)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => BuildRequests, (buildRequests) => buildRequests.application)
  buildRequests: BuildRequests[];

  @OneToMany(() => Features, (features) => features.application)
  features: Features[];

  @OneToMany(() => IosConfigs, (iosConfigs) => iosConfigs.application)
  iosConfigs: IosConfigs[];

  @OneToMany(() => Languages, (languages) => languages.application)
  languages: Languages[];

  @OneToMany(() => Licenses, (licenses) => licenses.application)
  licenses: Licenses[];

  @OneToMany(() => Stores, (stores) => stores.application)
  stores: Stores[];

  @OneToMany(() => Themes, (themes) => themes.application)
  themes: Themes[];

  @OneToMany(
    () => TranslationKeys,
    (translationKeys) => translationKeys.application
  )
  translationKeys: TranslationKeys[];
}
