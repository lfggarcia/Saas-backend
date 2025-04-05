import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Themes } from "./Themes";
import { TokenGroups } from "./TokenGroups";

@Index("theme_tokens_pkey", ["id"], { unique: true })
@Index(
  "theme_tokens_theme_id_token_group_id_token_key_key",
  ["themeId", "tokenGroupId", "tokenKey"],
  { unique: true }
)
@Entity("theme_tokens", { schema: "public" })
export class ThemeTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "theme_id", unique: true })
  themeId: string;

  @Column("uuid", { name: "token_group_id", unique: true })
  tokenGroupId: string;

  @Column("character varying", { name: "token_key", unique: true, length: 255 })
  tokenKey: string;

  @Column("character varying", { name: "token_value", length: 255 })
  tokenValue: string;

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

  @ManyToOne(() => Themes, (themes) => themes.themeTokens)
  @JoinColumn([{ name: "theme_id", referencedColumnName: "id" }])
  theme: Themes;

  @ManyToOne(() => TokenGroups, (tokenGroups) => tokenGroups.themeTokens)
  @JoinColumn([{ name: "token_group_id", referencedColumnName: "id" }])
  tokenGroup: TokenGroups;
}
