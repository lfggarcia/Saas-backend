import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ModulePermissions } from "./ModulePermissions";

@Index("modules_pkey", ["idModule"], { unique: true })
@Entity("modules", { schema: "public" })
export class Modules {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_module" })
  idModule: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => ModulePermissions,
    (modulePermissions) => modulePermissions.idModule
  )
  modulePermissions: ModulePermissions[];
}
