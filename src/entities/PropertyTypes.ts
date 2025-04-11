import { Column, Entity, Index, OneToMany } from "typeorm";
import { ComponentPoolProperties } from "./ComponentPoolProperties";

@Index("PK_129390b286b9c776438dfa475a8", ["id"], { unique: true })
@Index("property_types_pkey", ["id"], { unique: true })
@Index("UQ_3f23c3f28ed3e1a4b9d7f2ffa20", ["name"], { unique: true })
@Index("property_types_name_key", ["name"], { unique: true })
@Entity("property_types", { schema: "public" })
export class PropertyTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => ComponentPoolProperties,
    (componentPoolProperties) => componentPoolProperties.type
  )
  componentPoolProperties: ComponentPoolProperties[];
}
