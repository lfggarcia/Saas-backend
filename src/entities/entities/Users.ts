import {
	BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryMovements } from "./InventoryMovements";
import { JournalEntries } from "./JournalEntries";
import { Purchases } from "./Purchases";
import { SalesOrders } from "./SalesOrders";
import { SystemLogs } from "./SystemLogs";
import { UserRoles } from "./UserRoles";
import { UserTokens } from "./UserTokens";
import { Companies } from "./Companies";
import { UserStatus } from "./UserStatus";
import * as bcrypt from 'bcrypt';


@Index("users_pkey", ["idUser"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_user" })
  idUser: number;

  @Column("character varying", { name: "username", length: 50 })
  username: string;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("character varying", { name: "password", length: 100 })
  password: string;

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.idUser
  )
  inventoryMovements: InventoryMovements[];

  @OneToMany(() => JournalEntries, (journalEntries) => journalEntries.createdBy)
  journalEntries: JournalEntries[];

  @OneToMany(() => Purchases, (purchases) => purchases.idUser)
  purchases: Purchases[];

  @OneToMany(() => SalesOrders, (salesOrders) => salesOrders.idUser)
  salesOrders: SalesOrders[];

  @OneToMany(() => SystemLogs, (systemLogs) => systemLogs.idUser)
  systemLogs: SystemLogs[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.idUser)
  userRoles: UserRoles[];

  @OneToMany(() => UserTokens, (userTokens) => userTokens.idUser)
  userTokens: UserTokens[];

  @ManyToOne(() => Companies, (companies) => companies.users)
  @JoinColumn([
    { name: "id_client_company", referencedColumnName: "idCompany" },
  ])
  idClientCompany: Companies;

  @ManyToOne(() => Companies, (companies) => companies.users2)
  @JoinColumn([{ name: "id_company", referencedColumnName: "idCompany" }])
  idCompany: Companies;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  @JoinColumn([{ name: "status_id", referencedColumnName: "idStatus" }])
  status: UserStatus;

	@BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
