import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PurchaseDetails } from "./PurchaseDetails";
import { Branches } from "./Branches";
import { Providers } from "./Providers";
import { Users } from "./Users";
import { DocumentStatus } from "./DocumentStatus";

@Index("purchases_pkey", ["idPurchase"], { unique: true })
@Entity("purchases", { schema: "public" })
export class Purchases {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_purchase" })
  idPurchase: number;

  @Column("date", { name: "purchase_date" })
  purchaseDate: string;

  @Column("character varying", { name: "invoice_number", length: 50 })
  invoiceNumber: string;

  @Column("numeric", { name: "total_amount", precision: 10, scale: 2 })
  totalAmount: string;

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.idPurchase
  )
  purchaseDetails: PurchaseDetails[];

  @ManyToOne(() => Branches, (branches) => branches.purchases)
  @JoinColumn([{ name: "id_branch", referencedColumnName: "idBranch" }])
  idBranch: Branches;

  @ManyToOne(() => Providers, (providers) => providers.purchases)
  @JoinColumn([{ name: "id_provider", referencedColumnName: "idProvider" }])
  idProvider: Providers;

  @ManyToOne(() => Users, (users) => users.purchases)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;

  @ManyToOne(() => DocumentStatus, (documentStatus) => documentStatus.purchases)
  @JoinColumn([{ name: "status_id", referencedColumnName: "idStatus" }])
  status: DocumentStatus;
}
