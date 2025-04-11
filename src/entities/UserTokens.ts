import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { UserThemeTokens } from "./UserThemeTokens";
import { TokenDefinitions } from "./TokenDefinitions";
import { TokenCategories } from "./TokenCategories";
import { Users } from "./Users";

@Index("UQ_8c1787a4fc3b9f5ec1f3fedcc28", ["categoryId"], { unique: true })
@Index(
  "user_tokens_user_id_category_id_token_key_key",
  ["categoryId", "tokenKey", "userId"],
  { unique: true }
)
@Index("user_tokens_pkey", ["id"], { unique: true })
@Index("PK_63764db9d9aaa4af33e07b2f4bf", ["id"], { unique: true })
@Index("UQ_6a9964c4b6be00ae55eaae667f5", ["tokenKey"], { unique: true })
@Index("UQ_9e144a67be49e5bba91195ef5de", ["userId"], { unique: true })
@Entity("user_tokens", { schema: "public" })
export class UserTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("uuid", { name: "category_id" })
  categoryId: string;

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
    () => UserThemeTokens,
    (userThemeTokens) => userThemeTokens.userToken
  )
  userThemeTokens: UserThemeTokens;

  @ManyToOne(
    () => TokenDefinitions,
    (tokenDefinitions) => tokenDefinitions.userTokens
  )
  @JoinColumn([{ name: "base_token_id", referencedColumnName: "id" }])
  baseToken: TokenDefinitions;

  @OneToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.userTokens
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;

  @ManyToOne(() => Users, (users) => users.userTokens)
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy: Users;

  @OneToOne(() => Users, (users) => users.userTokens2, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
