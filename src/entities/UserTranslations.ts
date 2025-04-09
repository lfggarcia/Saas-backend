import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TranslationKeys } from "./TranslationKeys";
import { UserLanguages } from "./UserLanguages";

@Index("user_translations_pkey", ["id"], { unique: true })
@Index("user_translations_key_id_language_id_key", ["keyId", "languageId"], {
  unique: true,
})
@Entity("user_translations", { schema: "public" })
export class UserTranslations {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "key_id", unique: true })
  keyId: string;

  @Column("uuid", { name: "language_id", unique: true })
  languageId: string;

  @Column("text", { name: "translation" })
  translation: string;

  @Column("timestamp without time zone", {
    name: "last_updated_at",
    nullable: true,
    default: () => "now()",
  })
  lastUpdatedAt: Date | null;

  @ManyToOne(
    () => TranslationKeys,
    (translationKeys) => translationKeys.userTranslations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "key_id", referencedColumnName: "id" }])
  key: TranslationKeys;

  @ManyToOne(
    () => UserLanguages,
    (userLanguages) => userLanguages.userTranslations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "language_id", referencedColumnName: "id" }])
  language: UserLanguages;
}
