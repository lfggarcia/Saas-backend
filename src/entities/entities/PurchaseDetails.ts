import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Purchases } from "./Purchases";
import { ProductVariations } from "./ProductVariations";

@Index("purchase_details_pkey", ["idPurchaseDetail"], { unique: true })
@Entity("purchase_details", { schema: "public" })
export class PurchaseDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_purchase_detail" })
  idPurchaseDetail: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", { name: "unit_cost", precision: 10, scale: 2 })
  unitCost: string;

  @Column("numeric", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: string;

  @ManyToOne(() => Products, (products) => products.purchaseDetails)
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @ManyToOne(() => Purchases, (purchases) => purchases.purchaseDetails)
  @JoinColumn([{ name: "id_purchase", referencedColumnName: "idPurchase" }])
  idPurchase: Purchases;

  @ManyToOne(
    () => ProductVariations,
    (productVariations) => productVariations.purchaseDetails
  )
  @JoinColumn([{ name: "id_variation", referencedColumnName: "idVariation" }])
  idVariation: ProductVariations;
}
