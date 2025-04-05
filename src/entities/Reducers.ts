import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ReducerActions } from "./ReducerActions";
import { Stores } from "./Stores";

@Index("reducers_pkey", ["id"], { unique: true })
@Entity("reducers", { schema: "public" })
export class Reducers {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("jsonb", { name: "initial_state", nullable: true })
  initialState: object | null;

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

  @OneToMany(() => ReducerActions, (reducerActions) => reducerActions.reducer)
  reducerActions: ReducerActions[];

  @ManyToOne(() => Stores, (stores) => stores.reducers)
  @JoinColumn([{ name: "store_id", referencedColumnName: "id" }])
  store: Stores;
}
