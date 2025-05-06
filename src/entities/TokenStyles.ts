import { Column, Entity, Index } from "typeorm";

@Index("token_styles_pkey", ["id"], { unique: true })
@Entity("token_styles", { schema: "public" })
export class TokenStyles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("text", { name: "style_group" })
  styleGroup: string;

  @Column("text", { name: "variant_level" })
  variantLevel: string;

  @Column("text", { name: "property" })
  property: string;

  @Column("jsonb", { name: "value" })
  value: object;
}
