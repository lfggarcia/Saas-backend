import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Reducers } from "./Reducers";
import { Applications } from "./Applications";

@Index("stores_pkey", ["id"], { unique: true })
@Entity("stores", { schema: "public" })
export class Stores {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("jsonb", { name: "persist_config", nullable: true })
  persistConfig: object | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => Reducers, (reducers) => reducers.store)
  reducers: Reducers[];

  @ManyToOne(() => Applications, (applications) => applications.stores)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;
}
