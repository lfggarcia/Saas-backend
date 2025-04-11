import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { ScreenComponentOverrides } from "./ScreenComponentOverrides";
import { ComponentPool } from "./ComponentPool";
import { Screens } from "./Screens";

@Index(
  "screen_components_screen_id_component_id_alias_key",
  ["alias", "componentId", "screenId"],
  { unique: true }
)
@Index("UQ_7bcd45d72833b620314afb7037f", ["alias"], { unique: true })
@Index("UQ_f3b29f4b90906de0b6c82c600c8", ["componentId"], { unique: true })
@Index("PK_1c593a74a94442f41b57eb334ca", ["id"], { unique: true })
@Index("screen_components_pkey", ["id"], { unique: true })
@Index("idx_screen_components_screen", ["screenId"], {})
@Index("UQ_8b0a5fc1bfce3d224c9b3991757", ["screenId"], { unique: true })
@Entity("screen_components", { schema: "public" })
export class ScreenComponents {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "screen_id", nullable: true })
  screenId: string | null;

  @Column("uuid", { name: "component_id", nullable: true })
  componentId: string | null;

  @Column("integer", { name: "position_index", nullable: true })
  positionIndex: number | null;

  @Column("text", { name: "alias", nullable: true })
  alias: string | null;

  @OneToOne(
    () => ScreenComponentOverrides,
    (screenComponentOverrides) => screenComponentOverrides.screenComponent
  )
  screenComponentOverrides: ScreenComponentOverrides;

  @OneToOne(
    () => ComponentPool,
    (componentPool) => componentPool.screenComponents,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "component_id", referencedColumnName: "id" }])
  component: ComponentPool;

  @OneToOne(() => Screens, (screens) => screens.screenComponents, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "screen_id", referencedColumnName: "id" }])
  screen: Screens;
}
