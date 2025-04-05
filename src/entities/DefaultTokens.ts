import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TokenGroups } from "./TokenGroups";

@Index("default_tokens_pkey", ["id"], { unique: true })
@Index(
  "default_tokens_token_group_id_token_key_key",
  ["tokenGroupId", "tokenKey"],
  { unique: true }
)
@Entity("default_tokens", { schema: "public" })
export class DefaultTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "token_group_id", unique: true })
  tokenGroupId: string;

  @Column("character varying", { name: "token_key", unique: true, length: 255 })
  tokenKey: string;

  @Column("character varying", { name: "token_value", length: 255 })
  tokenValue: string;

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

  @ManyToOne(() => TokenGroups, (tokenGroups) => tokenGroups.defaultTokens)
  @JoinColumn([{ name: "token_group_id", referencedColumnName: "id" }])
  tokenGroup: TokenGroups;
}
