import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Users } from "./Users";
import { ProductVariations } from "./ProductVariations";
import { Warehouses } from "./Warehouses";

@Index("inventory_movements_pkey", ["idInventoryMovement"], { unique: true })
@Entity("inventory_movements", { schema: "public" })
export class InventoryMovements {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_inventory_movement" })
  idInventoryMovement: number;

  @Column("character varying", { name: "movement_type", length: 20 })
  movementType: string;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", {
    name: "unit_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitCost: string | null;

  @Column("timestamp without time zone", { name: "date" })
  date: Date;

  @Column("character varying", {
    name: "reference",
    nullable: true,
    length: 100,
  })
  reference: string | null;

  @ManyToOne(() => Products, (products) => products.inventoryMovements)
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @ManyToOne(() => Users, (users) => users.inventoryMovements)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;

  @ManyToOne(
    () => ProductVariations,
    (productVariations) => productVariations.inventoryMovements
  )
  @JoinColumn([{ name: "id_variation", referencedColumnName: "idVariation" }])
  idVariation: ProductVariations;

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.inventoryMovements)
  @JoinColumn([{ name: "id_warehouse", referencedColumnName: "idWarehouse" }])
  idWarehouse: Warehouses;
}
