import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { FormFields } from "./FormFields";
import { ValidationTypes } from "./ValidationTypes";

@Index("form_field_validations_pkey", ["id"], { unique: true })
@Entity("form_field_validations", { schema: "public" })
export class FormFieldValidations {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", {
    name: "validation_value",
    nullable: true,
    length: 255,
  })
  validationValue: string | null;

  @Column("character varying", { name: "validation_message", length: 255 })
  validationMessage: string;

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

  @ManyToOne(() => FormFields, (formFields) => formFields.formFieldValidations)
  @JoinColumn([{ name: "form_field_id", referencedColumnName: "id" }])
  formField: FormFields;

  @ManyToOne(
    () => ValidationTypes,
    (validationTypes) => validationTypes.formFieldValidations
  )
  @JoinColumn([{ name: "validation_type_id", referencedColumnName: "id" }])
  validationType: ValidationTypes;
}
