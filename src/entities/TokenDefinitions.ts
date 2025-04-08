import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TokenCategories } from "./TokenCategories";
import { UserTokens } from "./UserTokens";

@Index(
  "token_definitions_category_id_token_key_key",
  ["categoryId", "tokenKey"],
  { unique: true }
)
@Index("token_definitions_pkey", ["id"], { unique: true })
@Entity("token_definitions", { schema: "public" })
export class TokenDefinitions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "category_id", nullable: true, unique: true })
  categoryId: string | null;

  @Column("character varying", { name: "token_key", unique: true, length: 100 })
  tokenKey: string;

  @Column("character varying", { name: "token_value", length: 100 })
  tokenValue: string;

  @ManyToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.tokenDefinitions
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;

  @OneToMany(() => UserTokens, (userTokens) => userTokens.baseToken)
  userTokens: UserTokens[];
}
