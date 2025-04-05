import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { CustomTokens } from "./CustomTokens";
import { DefaultTokens } from "./DefaultTokens";
import { ThemeTokens } from "./ThemeTokens";
import { Aliases } from "./Aliases";

@Index("token_groups_pkey", ["id"], { unique: true })
@Index("token_groups_name_key", ["name"], { unique: true })
@Entity("token_groups", { schema: "public" })
export class TokenGroups {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @OneToMany(() => CustomTokens, (customTokens) => customTokens.tokenGroup)
  customTokens: CustomTokens[];

  @OneToMany(() => DefaultTokens, (defaultTokens) => defaultTokens.tokenGroup)
  defaultTokens: DefaultTokens[];

  @OneToMany(() => ThemeTokens, (themeTokens) => themeTokens.tokenGroup)
  themeTokens: ThemeTokens[];

  @ManyToMany(() => Aliases, (aliases) => aliases.tokenGroups)
  aliases: Aliases[];
}
