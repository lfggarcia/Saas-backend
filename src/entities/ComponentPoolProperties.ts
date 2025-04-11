import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { ComponentPool } from "./ComponentPool";
import { PropertyTypes } from "./PropertyTypes";

@Index("UQ_2be79fb60a6ed448a4dd9ba922f", ["componentId"], { unique: true })
@Index(
  "component_pool_properties_component_id_key_key",
  ["componentId", "key"],
  { unique: true }
)
@Index("component_pool_properties_pkey", ["id"], { unique: true })
@Index("PK_ef559c28c4a2bee8aeabe2e4107", ["id"], { unique: true })
@Index("UQ_b70c40fb18adeb35d0ee20036a3", ["key"], { unique: true })
@Entity("component_pool_properties", { schema: "public" })
export class ComponentPoolProperties {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "component_id", nullable: true })
  componentId: string | null;

  @Column("text", { name: "key" })
  key: string;

  @Column("text", { name: "default_value", nullable: true })
  defaultValue: string | null;

  @OneToOne(
    () => ComponentPool,
    (componentPool) => componentPool.componentPoolProperties,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "component_id", referencedColumnName: "id" }])
  component: ComponentPool;

  @ManyToOne(
    () => PropertyTypes,
    (propertyTypes) => propertyTypes.componentPoolProperties
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type: PropertyTypes;
}
