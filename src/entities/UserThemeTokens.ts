import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { UserThemes } from "./UserThemes";
import { UserTokens } from "./UserTokens";

@Index("user_theme_tokens_pkey", ["id"], { unique: true })
@Index("PK_d2f2065ba80f17c95ef811cc019", ["id"], { unique: true })
@Index("UQ_a6050543d5e5da1a9d7bfbbb7a4", ["themeId"], { unique: true })
@Index(
  "user_theme_tokens_theme_id_user_token_id_key",
  ["themeId", "userTokenId"],
  { unique: true }
)
@Index("UQ_28ab1c7a91d0ba22d0abeb90563", ["userTokenId"], { unique: true })
@Entity("user_theme_tokens", { schema: "public" })
export class UserThemeTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id" })
  themeId: string;

  @Column("uuid", { name: "user_token_id" })
  userTokenId: string;

  @OneToOne(() => UserThemes, (userThemes) => userThemes.userThemeTokens)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: UserThemes;

  @OneToOne(() => UserTokens, (userTokens) => userTokens.userThemeTokens)
  @JoinColumn([{ name: "user_token_id", referencedColumnName: "id" }])
  userToken: UserTokens;
}
