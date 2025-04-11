import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { ScreenComponents } from "./ScreenComponents";

@Index("PK_abd34875dfb0c136e82b64a3476", ["id"], { unique: true })
@Index("screen_component_overrides_pkey", ["id"], { unique: true })
@Index("UQ_f4716cf52178d96bd9fcc0aae58", ["key"], { unique: true })
@Index(
  "screen_component_overrides_screen_component_id_key_key",
  ["key", "screenComponentId"],
  { unique: true }
)
@Index("UQ_4da6cb3334881f5abdb4a22a9de", ["screenComponentId"], {
  unique: true,
})
@Entity("screen_component_overrides", { schema: "public" })
export class ScreenComponentOverrides {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "screen_component_id", nullable: true })
  screenComponentId: string | null;

  @Column("text", { name: "key" })
  key: string;

  @Column("text", { name: "value" })
  value: string;

  @OneToOne(
    () => ScreenComponents,
    (screenComponents) => screenComponents.screenComponentOverrides,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "screen_component_id", referencedColumnName: "id" }])
  screenComponent: ScreenComponents;
}
