import { Column, Entity, Index, OneToMany } from "typeorm";
import { ComponentPool } from "./ComponentPool";

@Index("PK_8a75c28f3e67b87f00442cac56a", ["id"], { unique: true })
@Index("component_types_pkey", ["id"], { unique: true })
@Index("UQ_da52ce52871813c122ec3934da0", ["name"], { unique: true })
@Index("component_types_name_key", ["name"], { unique: true })
@Entity("component_types", { schema: "public" })
export class ComponentTypes {
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

  @OneToMany(() => ComponentPool, (componentPool) => componentPool.type)
  componentPools: ComponentPool[];
}
