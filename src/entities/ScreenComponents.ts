import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FormFields } from "./FormFields";
import { GlobalComponents } from "./GlobalComponents";
import { ScreenVersions } from "./ScreenVersions";
import { TranslationKeys } from "./TranslationKeys";

@Index("screen_components_pkey", ["id"], { unique: true })
@Entity("screen_components", { schema: "public" })
export class ScreenComponents {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("jsonb", { name: "props", nullable: true })
  props: object | null;

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

  @Column("jsonb", { name: "events", nullable: true })
  events: object | null;

  @OneToMany(() => FormFields, (formFields) => formFields.screenComponent)
  formFields: FormFields[];

  @ManyToOne(
    () => GlobalComponents,
    (globalComponents) => globalComponents.screenComponents
  )
  @JoinColumn([{ name: "global_component_id", referencedColumnName: "id" }])
  globalComponent: GlobalComponents;

  @ManyToOne(
    () => ScreenVersions,
    (screenVersions) => screenVersions.screenComponents
  )
  @JoinColumn([{ name: "screen_version_id", referencedColumnName: "id" }])
  screenVersion: ScreenVersions;

  @ManyToOne(
    () => TranslationKeys,
    (translationKeys) => translationKeys.screenComponents
  )
  @JoinColumn([{ name: "translation_key_id", referencedColumnName: "id" }])
  translationKey: TranslationKeys;
}
