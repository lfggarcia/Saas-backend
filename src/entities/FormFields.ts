import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FormFieldValidations } from "./FormFieldValidations";
import { FieldTypes } from "./FieldTypes";
import { ScreenComponents } from "./ScreenComponents";

@Index("form_fields_pkey", ["id"], { unique: true })
@Entity("form_fields", { schema: "public" })
export class FormFields {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "label", length: 255 })
  label: string;

  @Column("character varying", {
    name: "placeholder",
    nullable: true,
    length: 255,
  })
  placeholder: string | null;

  @Column("boolean", {
    name: "required",
    nullable: true,
    default: () => "false",
  })
  required: boolean | null;

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

  @OneToMany(
    () => FormFieldValidations,
    (formFieldValidations) => formFieldValidations.formField
  )
  formFieldValidations: FormFieldValidations[];

  @ManyToOne(() => FieldTypes, (fieldTypes) => fieldTypes.formFields)
  @JoinColumn([{ name: "field_type_id", referencedColumnName: "id" }])
  fieldType: FieldTypes;

  @ManyToOne(
    () => ScreenComponents,
    (screenComponents) => screenComponents.formFields
  )
  @JoinColumn([{ name: "screen_component_id", referencedColumnName: "id" }])
  screenComponent: ScreenComponents;
}
