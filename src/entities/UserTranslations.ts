import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { TranslationKeys } from "./TranslationKeys";
import { UserLanguages } from "./UserLanguages";

@Index("PK_35f97f7c0e4322a7a16ed598f5e", ["id"], { unique: true })
@Index("user_translations_pkey", ["id"], { unique: true })
@Index("user_translations_key_id_language_id_key", ["keyId", "languageId"], {
  unique: true,
})
@Index("idx_user_translations_key_lang", ["keyId", "languageId"], {})
@Index("UQ_700452c396ceeb236c2d5386916", ["keyId"], { unique: true })
@Index("UQ_8c224e431bcf2c33ed3a959795d", ["languageId"], { unique: true })
@Entity("user_translations", { schema: "public" })
export class UserTranslations {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "key_id" })
  keyId: string;

  @Column("uuid", { name: "language_id" })
  languageId: string;

  @Column("text", { name: "translation" })
  translation: string;

  @Column("timestamp without time zone", {
    name: "last_updated_at",
    nullable: true,
    default: () => "now()",
  })
  lastUpdatedAt: Date | null;

  @OneToOne(
    () => TranslationKeys,
    (translationKeys) => translationKeys.userTranslations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "key_id", referencedColumnName: "id" }])
  key: TranslationKeys;

  @OneToOne(
    () => UserLanguages,
    (userLanguages) => userLanguages.userTranslations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "language_id", referencedColumnName: "id" }])
  language: UserLanguages;
}
