import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Modules } from "./Modules";
import { Permissions } from "./Permissions";

@Index("module_permissions_pkey", ["idModulePermission"], { unique: true })
@Entity("module_permissions", { schema: "public" })
export class ModulePermissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_module_permission" })
  idModulePermission: number;

  @ManyToOne(() => Modules, (modules) => modules.modulePermissions)
  @JoinColumn([{ name: "id_module", referencedColumnName: "idModule" }])
  idModule: Modules;

  @ManyToOne(() => Permissions, (permissions) => permissions.modulePermissions)
  @JoinColumn([{ name: "id_permission", referencedColumnName: "idPermission" }])
  idPermission: Permissions;
}
