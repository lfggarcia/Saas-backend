import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("user_status_pkey", ["idStatus"], { unique: true })
@Entity("user_status", { schema: "public" })
export class UserStatus {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_status" })
  idStatus: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @OneToMany(() => Users, (users) => users.status)
  users: Users[];
}
