import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("system_logs_pkey", ["idLog"], { unique: true })
@Entity("system_logs", { schema: "public" })
export class SystemLogs {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("character varying", { name: "action", length: 100 })
  action: string;

  @Column("character varying", { name: "module", length: 50 })
  module: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", { name: "log_date" })
  logDate: Date;

  @Column("character varying", {
    name: "ip_address",
    nullable: true,
    length: 50,
  })
  ipAddress: string | null;

  @ManyToOne(() => Users, (users) => users.systemLogs)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}
