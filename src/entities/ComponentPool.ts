import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { ComponentTypes } from "./ComponentTypes";
import { ComponentPoolProperties } from "./ComponentPoolProperties";
import { ScreenComponents } from "./ScreenComponents";

@Index("PK_2e86830b7878a5eaaa58dd7eaed", ["id"], { unique: true })
@Index("component_pool_pkey", ["id"], { unique: true })
@Index("component_pool_name_key", ["name"], { unique: true })
@Index("UQ_f4afbf11d05ab8ce248c64a1ca0", ["name"], { unique: true })
@Entity("component_pool", { schema: "public" })
export class ComponentPool {
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

  @ManyToOne(
    () => ComponentTypes,
    (componentTypes) => componentTypes.componentPools
  )
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type: ComponentTypes;

  @OneToOne(
    () => ComponentPoolProperties,
    (componentPoolProperties) => componentPoolProperties.component
  )
  componentPoolProperties: ComponentPoolProperties;

  @OneToOne(
    () => ScreenComponents,
    (screenComponents) => screenComponents.component
  )
  screenComponents: ScreenComponents;
}
