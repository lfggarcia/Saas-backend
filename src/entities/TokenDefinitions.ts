import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { TokenCategories } from "./TokenCategories";
import { UserTokens } from "./UserTokens";

@Index(
  "token_definitions_category_id_token_key_key",
  ["categoryId", "tokenKey"],
  { unique: true }
)
@Index("UQ_df2aa7555b8c6d35bef74cd45bc", ["categoryId"], { unique: true })
@Index("PK_0a02befda3c64c7b6c2c56cf77a", ["id"], { unique: true })
@Index("token_definitions_pkey", ["id"], { unique: true })
@Index("UQ_2d0b7ca70dc58e9cc0334d3fb23", ["tokenKey"], { unique: true })
@Entity("token_definitions", { schema: "public" })
export class TokenDefinitions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "category_id", nullable: true })
  categoryId: string | null;

  @Column("character varying", { name: "token_key", length: 100 })
  tokenKey: string;

  @Column("character varying", { name: "token_value", length: 100 })
  tokenValue: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @OneToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.tokenDefinitions
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;

  @OneToMany(() => UserTokens, (userTokens) => userTokens.baseToken)
  userTokens: UserTokens[];
}
