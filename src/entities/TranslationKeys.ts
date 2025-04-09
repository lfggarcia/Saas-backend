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

@Index("translation_keys_pkey", ["id"], { unique: true })
@Index(
  "translation_keys_user_id_namespace_key_key",
  ["key", "namespace", "userId"],
  { unique: true }
)
@Entity("translation_keys", { schema: "public" })
export class TranslationKeys {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("text", { name: "namespace", nullable: true, unique: true })
  namespace: string | null;

  @Column("text", { name: "key", unique: true })
  key: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(() => Users, (users) => users.translationKeys, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => UserTranslations, (userTranslations) => userTranslations.key)
  userTranslations: UserTranslations[];
}
