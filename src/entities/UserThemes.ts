import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { UserGlobalStyles } from "./UserGlobalStyles";
import { UserThemeTokens } from "./UserThemeTokens";
import { Users } from "./Users";

@Index("user_themes_pkey", ["id"], { unique: true })
@Index("PK_8945097dae90f61b5558f3f9e96", ["id"], { unique: true })
@Entity("user_themes", { schema: "public" })
export class UserThemes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @OneToOne(
    () => UserGlobalStyles,
    (userGlobalStyles) => userGlobalStyles.theme
  )
  userGlobalStyles: UserGlobalStyles;

  @OneToOne(() => UserThemeTokens, (userThemeTokens) => userThemeTokens.theme)
  userThemeTokens: UserThemeTokens;

  @ManyToOne(() => Users, (users) => users.userThemes)
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy: Users;

  @ManyToOne(() => Users, (users) => users.userThemes2, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
