import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Applications } from "./Applications";
import { TranslationValues } from "./TranslationValues";

@Index("languages_pkey", ["id"], { unique: true })
@Entity("languages", { schema: "public" })
export class Languages {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("boolean", {
    name: "is_default",
    nullable: true,
    default: () => "false",
  })
  isDefault: boolean | null;

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

  @ManyToOne(() => Applications, (applications) => applications.languages)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;

  @OneToMany(
    () => TranslationValues,
    (translationValues) => translationValues.language
  )
  translationValues: TranslationValues[];
}
