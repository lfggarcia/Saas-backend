import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { UserThemes } from "./UserThemes";
import { UserTokens } from "./UserTokens";

@Index("user_theme_tokens_pkey", ["id"], { unique: true })
@Index(
  "user_theme_tokens_theme_id_user_token_id_key",
  ["themeId", "userTokenId"],
  { unique: true }
)
@Entity("user_theme_tokens", { schema: "public" })
export class UserThemeTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id", unique: true })
  themeId: string;

  @Column("uuid", { name: "user_token_id", unique: true })
  userTokenId: string;

  @ManyToOne(() => UserThemes, (userThemes) => userThemes.userThemeTokens)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: UserThemes;

  @ManyToOne(() => UserTokens, (userTokens) => userTokens.userThemeTokens)
  @JoinColumn([{ name: "user_token_id", referencedColumnName: "id" }])
  userToken: UserTokens;
}
