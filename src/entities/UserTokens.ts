import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { UserThemeTokens } from "./UserThemeTokens";
import { TokenDefinitions } from "./TokenDefinitions";
import { TokenCategories } from "./TokenCategories";

@Index(
  "user_tokens_user_id_category_id_token_key_key",
  ["categoryId", "tokenKey", "userId"],
  { unique: true }
)
@Index("user_tokens_pkey", ["id"], { unique: true })
@Entity("user_tokens", { schema: "public" })
export class UserTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("uuid", { name: "category_id", unique: true })
  categoryId: string;

  @Column("character varying", { name: "token_key", unique: true, length: 100 })
  tokenKey: string;

  @Column("character varying", { name: "token_value", length: 100 })
  tokenValue: string;

  @OneToMany(
    () => UserThemeTokens,
    (userThemeTokens) => userThemeTokens.userToken
  )
  userThemeTokens: UserThemeTokens[];

  @ManyToOne(
    () => TokenDefinitions,
    (tokenDefinitions) => tokenDefinitions.userTokens
  )
  @JoinColumn([{ name: "base_token_id", referencedColumnName: "id" }])
  baseToken: TokenDefinitions;

  @ManyToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.userTokens
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;
}
