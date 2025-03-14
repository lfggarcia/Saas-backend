import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceDetails } from "./InvoiceDetails";
import { Branches } from "./Branches";
import { Clients } from "./Clients";
import { Currencies } from "./Currencies";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentTypes } from "./DocumentTypes";
import { SalesOrders } from "./SalesOrders";

@Index("invoices_pkey", ["idInvoice"], { unique: true })
@Entity("invoices", { schema: "public" })
export class Invoices {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_invoice" })
  idInvoice: number;

  @Column("character varying", { name: "invoice_number", length: 50 })
  invoiceNumber: string;

  @Column("date", { name: "invoice_date" })
  invoiceDate: string;

  @Column("date", { name: "due_date" })
  dueDate: string;

  @Column("numeric", { name: "total_amount", precision: 10, scale: 2 })
  totalAmount: string;

  @OneToMany(() => InvoiceDetails, (invoiceDetails) => invoiceDetails.idInvoice)
  invoiceDetails: InvoiceDetails[];

  @ManyToOne(() => Branches, (branches) => branches.invoices)
  @JoinColumn([{ name: "id_branch", referencedColumnName: "idBranch" }])
  idBranch: Branches;

  @ManyToOne(() => Clients, (clients) => clients.invoices)
  @JoinColumn([{ name: "id_client", referencedColumnName: "idClient" }])
  idClient: Clients;

  @ManyToOne(() => Currencies, (currencies) => currencies.invoices)
  @JoinColumn([{ name: "id_currency", referencedColumnName: "idCurrency" }])
  idCurrency: Currencies;

  @ManyToOne(() => DocumentStatus, (documentStatus) => documentStatus.invoices)
  @JoinColumn([
    { name: "id_document_status", referencedColumnName: "idStatus" },
  ])
  idDocumentStatus: DocumentStatus;

  @ManyToOne(() => DocumentTypes, (documentTypes) => documentTypes.invoices)
  @JoinColumn([{ name: "id_document_type", referencedColumnName: "idType" }])
  idDocumentType: DocumentTypes;

  @ManyToOne(() => SalesOrders, (salesOrders) => salesOrders.invoices)
  @JoinColumn([
    { name: "id_sales_order", referencedColumnName: "idSalesOrder" },
  ])
  idSalesOrder: SalesOrders;
}
