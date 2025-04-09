import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { UserTranslations } from "./UserTranslations";

@Index("user_languages_pkey", ["id"], { unique: true })
@Index("user_languages_user_id_locale_code_key", ["localeCode", "userId"], {
  unique: true,
})
@Entity("user_languages", { schema: "public" })
export class UserLanguages {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("character varying", {
    name: "locale_code",
    unique: true,
    length: 10,
  })
  localeCode: string;

  @Column("character varying", { name: "display_name", length: 100 })
  displayName: string;

  @Column("boolean", {
    name: "is_default",
    nullable: true,
    default: () => "false",
  })
  isDefault: boolean | null;

  @ManyToOne(() => Users, (users) => users.userLanguages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => UserTranslations,
    (userTranslations) => userTranslations.language
  )
  userTranslations: UserTranslations[];
}
