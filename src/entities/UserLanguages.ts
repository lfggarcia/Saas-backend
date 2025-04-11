import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Users } from "./Users";
import { UserTranslations } from "./UserTranslations";

@Index("user_languages_pkey", ["id"], { unique: true })
@Index("PK_a98f4f961abaede9204f3b1dc7b", ["id"], { unique: true })
@Index("UQ_b73360f8c84f8d6b3ea1a1c8786", ["localeCode"], { unique: true })
@Index("user_languages_user_id_locale_code_key", ["localeCode", "userId"], {
  unique: true,
})
@Index("UQ_1f9e6f03b56e66eee864aa6af95", ["userId"], { unique: true })
@Entity("user_languages", { schema: "public" })
export class UserLanguages {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("character varying", { name: "locale_code", length: 10 })
  localeCode: string;

  @Column("character varying", { name: "display_name", length: 100 })
  displayName: string;

  @Column("boolean", {
    name: "is_default",
    nullable: true,
    default: () => "false",
  })
  isDefault: boolean | null;

  @OneToOne(() => Users, (users) => users.userLanguages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToOne(
    () => UserTranslations,
    (userTranslations) => userTranslations.language
  )
  userTranslations: UserTranslations;
}
