import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Users } from "./Users";
import { UserTranslations } from "./UserTranslations";

@Index("translation_keys_pkey", ["id"], { unique: true })
@Index("PK_b9fb6087506f44b1a451c8a5991", ["id"], { unique: true })
@Index(
  "translation_keys_user_id_namespace_key_key",
  ["key", "namespace", "userId"],
  { unique: true }
)
@Index("UQ_cf2395b8b962f90cd640e191446", ["key"], { unique: true })
@Index("UQ_13d6da8ac04a02980674f02755e", ["namespace"], { unique: true })
@Index("UQ_a315f559889cbe508fb6adb3e8c", ["userId"], { unique: true })
@Index("idx_translation_keys_user", ["userId"], {})
@Entity("translation_keys", { schema: "public" })
export class TranslationKeys {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("text", { name: "namespace", nullable: true })
  namespace: string | null;

  @Column("text", { name: "key" })
  key: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToOne(() => Users, (users) => users.translationKeys, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToOne(() => UserTranslations, (userTranslations) => userTranslations.key)
  userTranslations: UserTranslations;
}
