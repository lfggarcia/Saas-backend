import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ScreenComponents } from "./ScreenComponents";
import { Applications } from "./Applications";
import { TranslationValues } from "./TranslationValues";

@Index("translation_keys_application_id_key_key", ["applicationId", "key"], {
  unique: true,
})
@Index("translation_keys_pkey", ["id"], { unique: true })
@Entity("translation_keys", { schema: "public" })
export class TranslationKeys {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "application_id", nullable: true, unique: true })
  applicationId: string | null;

  @Column("character varying", { name: "key", unique: true, length: 255 })
  key: string;

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

  @OneToMany(
    () => ScreenComponents,
    (screenComponents) => screenComponents.translationKey
  )
  screenComponents: ScreenComponents[];

  @ManyToOne(() => Applications, (applications) => applications.translationKeys)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @OneToMany(
    () => TranslationValues,
    (translationValues) => translationValues.translationKey
  )
  translationValues: TranslationValues[];
}
