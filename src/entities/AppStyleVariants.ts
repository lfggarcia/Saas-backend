import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AppStyleVariantProperties } from "./AppStyleVariantProperties";
import { Applications } from "./Applications";

@Index(
  "app_style_variants_application_id_name_level_key",
  ["applicationId", "level", "name"],
  { unique: true }
)
@Index("app_style_variants_pkey", ["id"], { unique: true })
@Entity("app_style_variants", { schema: "public" })
export class AppStyleVariants {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "application_id", nullable: true, unique: true })
  applicationId: string | null;

  @Column("character varying", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("integer", { name: "level", unique: true })
  level: number;

  @OneToMany(
    () => AppStyleVariantProperties,
    (appStyleVariantProperties) => appStyleVariantProperties.appVariant
  )
  appStyleVariantProperties: AppStyleVariantProperties[];

  @ManyToOne(
    () => Applications,
    (applications) => applications.appStyleVariants,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;
}
