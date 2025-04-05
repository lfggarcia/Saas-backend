import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reducers } from "./Reducers";

@Index("reducer_actions_pkey", ["id"], { unique: true })
@Entity("reducer_actions", { schema: "public" })
export class ReducerActions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "action_name", length: 255 })
  actionName: string;

  @Column("character varying", {
    name: "action_type",
    nullable: true,
    length: 50,
  })
  actionType: string | null;

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

  @ManyToOne(() => Reducers, (reducers) => reducers.reducerActions)
  @JoinColumn([{ name: "reducer_id", referencedColumnName: "id" }])
  reducer: Reducers;
}
