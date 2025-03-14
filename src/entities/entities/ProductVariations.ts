import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryMovements } from "./InventoryMovements";
import { InvoiceDetails } from "./InvoiceDetails";
import { Products } from "./Products";
import { PurchaseDetails } from "./PurchaseDetails";
import { SalesOrderDetails } from "./SalesOrderDetails";
import { VariationAttributeValues } from "./VariationAttributeValues";

@Index("product_variations_pkey", ["idVariation"], { unique: true })
@Index("product_variations_sku_key", ["sku"], { unique: true })
@Entity("product_variations", { schema: "public" })
export class ProductVariations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_variation" })
  idVariation: number;

  @Column("character varying", { name: "sku", unique: true, length: 50 })
  sku: string;

  @Column("numeric", {
    name: "additional_price",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "0.00",
  })
  additionalPrice: string | null;

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.idVariation
  )
  inventoryMovements: InventoryMovements[];

  @OneToMany(
    () => InvoiceDetails,
    (invoiceDetails) => invoiceDetails.idVariation
  )
  invoiceDetails: InvoiceDetails[];

  @ManyToOne(() => Products, (products) => products.productVariations)
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.idVariation
  )
  purchaseDetails: PurchaseDetails[];

  @OneToMany(
    () => SalesOrderDetails,
    (salesOrderDetails) => salesOrderDetails.idVariation
  )
  salesOrderDetails: SalesOrderDetails[];

  @ManyToMany(
    () => VariationAttributeValues,
    (variationAttributeValues) => variationAttributeValues.productVariations
  )
  variationAttributeValues: VariationAttributeValues[];
}
