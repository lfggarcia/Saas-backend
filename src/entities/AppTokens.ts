import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Applications } from "./Applications";
import { TokenCategories } from "./TokenCategories";

@Index(
  "app_tokens_application_id_category_id_key_key",
  ["applicationId", "categoryId", "key"],
  { unique: true }
)
@Index("app_tokens_pkey", ["id"], { unique: true })
@Entity("app_tokens", { schema: "public" })
export class AppTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "application_id", nullable: true, unique: true })
  applicationId: string | null;

  @Column("uuid", { name: "category_id", nullable: true, unique: true })
  categoryId: string | null;

  @Column("character varying", { name: "key", unique: true, length: 100 })
  key: string;

  @Column("text", { name: "value" })
  value: string;

  @ManyToOne(() => Applications, (applications) => applications.appTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @ManyToOne(
    () => TokenCategories,
    (tokenCategories) => tokenCategories.appTokens
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: TokenCategories;
}
