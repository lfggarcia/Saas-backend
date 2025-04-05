import { Column, Entity, Index, OneToMany } from "typeorm";
import { FormFields } from "./FormFields";

@Index("field_types_pkey", ["id"], { unique: true })
@Index("field_types_name_key", ["name"], { unique: true })
@Entity("field_types", { schema: "public" })
export class FieldTypes {
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

  @OneToMany(() => FormFields, (formFields) => formFields.fieldType)
  formFields: FormFields[];
}
