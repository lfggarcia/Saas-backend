import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TokenCategories } from "./TokenCategories";

@Index("default_tokens_category_id_key_key", ["categoryId", "key"], {
  unique: true,
})
@Index("default_tokens_pkey", ["id"], { unique: true })
@Entity("default_tokens", { schema: "public" })
export class DefaultTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "category_id", nullable: true, unique: true })
  categoryId: string | null;

  @Column("character varying", { name: "key", unique: true, length: 100 })
  key: string;

  @Column("text", { name: "value" })
  value: string;

  @ManyToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.defaultTokens
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;
}
