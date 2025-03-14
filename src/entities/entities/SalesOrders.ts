import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { SalesOrderDetails } from "./SalesOrderDetails";
import { Branches } from "./Branches";
import { Clients } from "./Clients";
import { Users } from "./Users";
import { DocumentStatus } from "./DocumentStatus";

@Index("sales_orders_pkey", ["idSalesOrder"], { unique: true })
@Entity("sales_orders", { schema: "public" })
export class SalesOrders {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sales_order" })
  idSalesOrder: number;

  @Column("date", { name: "order_date" })
  orderDate: string;

  @Column("date", { name: "due_date" })
  dueDate: string;

  @Column("numeric", { name: "total_amount", precision: 10, scale: 2 })
  totalAmount: string;

  @OneToMany(() => Invoices, (invoices) => invoices.idSalesOrder)
  invoices: Invoices[];

  @OneToMany(
    () => SalesOrderDetails,
    (salesOrderDetails) => salesOrderDetails.idSalesOrder
  )
  salesOrderDetails: SalesOrderDetails[];

  @ManyToOne(() => Branches, (branches) => branches.salesOrders)
  @JoinColumn([{ name: "id_branch", referencedColumnName: "idBranch" }])
  idBranch: Branches;

  @ManyToOne(() => Clients, (clients) => clients.salesOrders)
  @JoinColumn([{ name: "id_client", referencedColumnName: "idClient" }])
  idClient: Clients;

  @ManyToOne(() => Users, (users) => users.salesOrders)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;

  @ManyToOne(
    () => DocumentStatus,
    (documentStatus) => documentStatus.salesOrders
  )
  @JoinColumn([{ name: "status_id", referencedColumnName: "idStatus" }])
  status: DocumentStatus;
}
