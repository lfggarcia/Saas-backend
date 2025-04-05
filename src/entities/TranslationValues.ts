import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Languages } from "./Languages";
import { TranslationKeys } from "./TranslationKeys";

@Index("translation_values_pkey", ["id"], { unique: true })
@Index(
  "translation_values_translation_key_id_language_id_key",
  ["languageId", "translationKeyId"],
  { unique: true }
)
@Entity("translation_values", { schema: "public" })
export class TranslationValues {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "translation_key_id", unique: true })
  translationKeyId: string;

  @Column("uuid", { name: "language_id", unique: true })
  languageId: string;

  @Column("text", { name: "translation_text" })
  translationText: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Languages, (languages) => languages.translationValues)
  @JoinColumn([{ name: "language_id", referencedColumnName: "id" }])
  language: Languages;

  @ManyToOne(
    () => TranslationKeys,
    (translationKeys) => translationKeys.translationValues
  )
  @JoinColumn([{ name: "translation_key_id", referencedColumnName: "id" }])
  translationKey: TranslationKeys;
}
