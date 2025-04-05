import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CustomTokens } from "./CustomTokens";
import { GlobalStyles } from "./GlobalStyles";
import { ThemeTokens } from "./ThemeTokens";
import { Applications } from "./Applications";

@Index("themes_pkey", ["id"], { unique: true })
@Entity("themes", { schema: "public" })
export class Themes {
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

  @OneToMany(() => CustomTokens, (customTokens) => customTokens.theme)
  customTokens: CustomTokens[];

  @OneToMany(() => GlobalStyles, (globalStyles) => globalStyles.theme)
  globalStyles: GlobalStyles[];

  @OneToMany(() => ThemeTokens, (themeTokens) => themeTokens.theme)
  themeTokens: ThemeTokens[];

  @ManyToOne(() => Applications, (applications) => applications.themes)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;
}
