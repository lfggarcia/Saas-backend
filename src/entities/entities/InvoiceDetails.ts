import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { Products } from "./Products";
import { ProductVariations } from "./ProductVariations";

@Index("invoice_details_pkey", ["idInvoiceDetail"], { unique: true })
@Entity("invoice_details", { schema: "public" })
export class InvoiceDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_invoice_detail" })
  idInvoiceDetail: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", { name: "unit_price", precision: 10, scale: 2 })
  unitPrice: string;

  @Column("numeric", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: string;

  @ManyToOne(() => Invoices, (invoices) => invoices.invoiceDetails)
  @JoinColumn([{ name: "id_invoice", referencedColumnName: "idInvoice" }])
  idInvoice: Invoices;

  @ManyToOne(() => Products, (products) => products.invoiceDetails)
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @ManyToOne(
    () => ProductVariations,
    (productVariations) => productVariations.invoiceDetails
  )
  @JoinColumn([{ name: "id_variation", referencedColumnName: "idVariation" }])
  idVariation: ProductVariations;
}
