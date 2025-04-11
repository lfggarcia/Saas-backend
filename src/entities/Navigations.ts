import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Features } from "./Features";
import { Apps } from "./Apps";
import { NavigationTypes } from "./NavigationTypes";

@Index("UQ_7e2eafa4a48b25d626a527352d1", ["appId"], { unique: true })
@Index("navigations_app_id_name_key", ["appId", "name"], { unique: true })
@Index("navigations_pkey", ["id"], { unique: true })
@Index("PK_3f38689f82ca58a9ed44bc560ae", ["id"], { unique: true })
@Index("UQ_3e32258be055f1400000c6c4a4e", ["name"], { unique: true })
@Entity("navigations", { schema: "public" })
export class Navigations {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "app_id" })
  appId: string;

  @Column("text", { name: "name" })
  name: string;

  @OneToMany(() => Features, (features) => features.navigation)
  features: Features[];

  @OneToOne(() => Apps, (apps) => apps.navigations, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "app_id", referencedColumnName: "id" }])
  app: Apps;

  @ManyToOne(
    () => NavigationTypes,
    (navigationTypes) => navigationTypes.navigations
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type: NavigationTypes;
}
