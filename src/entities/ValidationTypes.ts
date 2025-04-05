import { Column, Entity, Index, OneToMany } from "typeorm";
import { FormFieldValidations } from "./FormFieldValidations";

@Index("validation_types_pkey", ["id"], { unique: true })
@Index("validation_types_name_key", ["name"], { unique: true })
@Entity("validation_types", { schema: "public" })
export class ValidationTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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
    () => FormFieldValidations,
    (formFieldValidations) => formFieldValidations.validationType
  )
  formFieldValidations: FormFieldValidations[];
}
