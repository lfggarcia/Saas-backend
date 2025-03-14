import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { SalesOrders } from "./SalesOrders";
import { ProductVariations } from "./ProductVariations";

@Index("sales_order_details_pkey", ["idDetail"], { unique: true })
@Entity("sales_order_details", { schema: "public" })
export class SalesOrderDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_detail" })
  idDetail: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", { name: "unit_price", precision: 10, scale: 2 })
  unitPrice: string;

  @Column("numeric", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: string;

  @ManyToOne(() => Products, (products) => products.salesOrderDetails)
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @ManyToOne(() => SalesOrders, (salesOrders) => salesOrders.salesOrderDetails)
  @JoinColumn([
    { name: "id_sales_order", referencedColumnName: "idSalesOrder" },
  ])
  idSalesOrder: SalesOrders;

  @ManyToOne(
    () => ProductVariations,
    (productVariations) => productVariations.salesOrderDetails
  )
  @JoinColumn([{ name: "id_variation", referencedColumnName: "idVariation" }])
  idVariation: ProductVariations;
}
