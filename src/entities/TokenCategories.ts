import { Column, Entity, Index, OneToMany } from "typeorm";
import { TokenDefinitions } from "./TokenDefinitions";
import { UserTokens } from "./UserTokens";

@Index("token_categories_pkey", ["id"], { unique: true })
@Index("token_categories_name_key", ["name"], { unique: true })
@Entity("token_categories", { schema: "public" })
export class TokenCategories {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @OneToMany(
    () => TokenDefinitions,
    (tokenDefinitions) => tokenDefinitions.category
  )
  tokenDefinitions: TokenDefinitions[];

  @OneToMany(() => UserTokens, (userTokens) => userTokens.category)
  userTokens: UserTokens[];
}
