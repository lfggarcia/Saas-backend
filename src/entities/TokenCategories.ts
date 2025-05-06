import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppTokens } from "./AppTokens";
import { DefaultTokens } from "./DefaultTokens";

@Index("token_categories_pkey", ["id"], { unique: true })
@Index("token_categories_name_key", ["name"], { unique: true })
@Entity("token_categories", { schema: "public" })
export class TokenCategories {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @OneToMany(() => AppTokens, (appTokens) => appTokens.category)
  appTokens: AppTokens[];

  @OneToMany(() => DefaultTokens, (defaultTokens) => defaultTokens.category)
  defaultTokens: DefaultTokens[];
}
