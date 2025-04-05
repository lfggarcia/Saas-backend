import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { GlobalStyleVariants } from "./GlobalStyleVariants";
import { Themes } from "./Themes";

@Index("global_styles_pkey", ["id"], { unique: true })
@Index("global_styles_theme_id_name_key", ["name", "themeId"], { unique: true })
@Entity("global_styles", { schema: "public" })
export class GlobalStyles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id", unique: true })
  themeId: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
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

  @OneToMany(
    () => GlobalStyleVariants,
    (globalStyleVariants) => globalStyleVariants.globalStyle
  )
  globalStyleVariants: GlobalStyleVariants[];

  @ManyToOne(() => Themes, (themes) => themes.globalStyles)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: Themes;
}
