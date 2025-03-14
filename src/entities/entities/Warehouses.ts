import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branches } from "./Branches";
import { InventoryMovements } from "./InventoryMovements";

@Index("warehouses_pkey", ["idWarehouse"], { unique: true })
@Entity("warehouses", { schema: "public" })
export class Warehouses {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_warehouse" })
  idWarehouse: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "location", nullable: true })
  location: string | null;

  @ManyToMany(() => Branches, (branches) => branches.warehouses)
  branches: Branches[];

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.idWarehouse
  )
  inventoryMovements: InventoryMovements[];
}
