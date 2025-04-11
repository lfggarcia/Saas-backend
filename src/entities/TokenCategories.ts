import { Column, Entity, Index, OneToOne } from "typeorm";
import { TokenDefinitions } from "./TokenDefinitions";
import { UserTokens } from "./UserTokens";

@Index("PK_38014d023b6389c174f00d70570", ["id"], { unique: true })
@Index("token_categories_pkey", ["id"], { unique: true })
@Index("token_categories_name_key", ["name"], { unique: true })
@Index("UQ_3f7eace6b177203b75e97caa81e", ["name"], { unique: true })
@Entity("token_categories", { schema: "public" })
export class TokenCategories {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToOne(
    () => TokenDefinitions,
    (tokenDefinitions) => tokenDefinitions.category
  )
  tokenDefinitions: TokenDefinitions;

  @OneToOne(() => UserTokens, (userTokens) => userTokens.category)
  userTokens: UserTokens;
}
