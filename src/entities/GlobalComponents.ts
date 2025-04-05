import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ComponentTypes } from "./ComponentTypes";
import { ScreenComponents } from "./ScreenComponents";

@Index("global_components_pkey", ["id"], { unique: true })
@Entity("global_components", { schema: "public" })
export class GlobalComponents {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("jsonb", { name: "default_props", nullable: true })
  defaultProps: object | null;

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

  @ManyToOne(
    () => ComponentTypes,
    (componentTypes) => componentTypes.globalComponents
  )
  @JoinColumn([{ name: "component_type_id", referencedColumnName: "id" }])
  componentType: ComponentTypes;

  @OneToMany(
    () => ScreenComponents,
    (screenComponents) => screenComponents.globalComponent
  )
  screenComponents: ScreenComponents[];
}
