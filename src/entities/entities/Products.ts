import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryMovements } from "./InventoryMovements";
import { InvoiceDetails } from "./InvoiceDetails";
import { TaxonomyTerms } from "./TaxonomyTerms";
import { ProductVariations } from "./ProductVariations";
import { Companies } from "./Companies";
import { ProductStatus } from "./ProductStatus";
import { PurchaseDetails } from "./PurchaseDetails";
import { SalesOrderDetails } from "./SalesOrderDetails";

@Index("products_pkey", ["idProduct"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_product" })
  idProduct: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("numeric", {
    name: "unit_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitPrice: string | null;

  @Column("numeric", {
    name: "cost_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costPrice: string | null;

  @Column("boolean", { name: "has_variations", default: () => "false" })
  hasVariations: boolean;

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.idProduct
  )
  inventoryMovements: InventoryMovements[];

  @OneToMany(() => InvoiceDetails, (invoiceDetails) => invoiceDetails.idProduct)
  invoiceDetails: InvoiceDetails[];

  @ManyToMany(() => TaxonomyTerms, (taxonomyTerms) => taxonomyTerms.products)
  @JoinTable({
    name: "product_taxonomy_terms",
    joinColumns: [{ name: "id_product", referencedColumnName: "idProduct" }],
    inverseJoinColumns: [{ name: "id_term", referencedColumnName: "idTerm" }],
    schema: "public",
  })
  taxonomyTerms: TaxonomyTerms[];

  @OneToMany(
    () => ProductVariations,
    (productVariations) => productVariations.idProduct
  )
  productVariations: ProductVariations[];

  @ManyToOne(() => Companies, (companies) => companies.products)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => ProductStatus, (productStatus) => productStatus.products)
  @JoinColumn([{ name: "product_status_id", referencedColumnName: "idStatus" }])
  productStatus: ProductStatus;

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.idProduct
  )
  purchaseDetails: PurchaseDetails[];

  @OneToMany(
    () => SalesOrderDetails,
    (salesOrderDetails) => salesOrderDetails.idProduct
  )
  salesOrderDetails: SalesOrderDetails[];
}
