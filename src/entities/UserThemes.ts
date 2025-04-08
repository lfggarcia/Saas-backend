import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserGlobalStyles } from "./UserGlobalStyles";
import { UserThemeTokens } from "./UserThemeTokens";

@Index("user_themes_pkey", ["id"], { unique: true })
@Entity("user_themes", { schema: "public" })
export class UserThemes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

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
    () => UserGlobalStyles,
    (userGlobalStyles) => userGlobalStyles.theme
  )
  userGlobalStyles: UserGlobalStyles[];

  @OneToMany(() => UserThemeTokens, (userThemeTokens) => userThemeTokens.theme)
  userThemeTokens: UserThemeTokens[];
}
