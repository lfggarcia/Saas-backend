import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppStyleVariants } from "./AppStyleVariants";
import { AppTokens } from "./AppTokens";

@Index("applications_pkey", ["id"], { unique: true })
@Index("applications_name_key", ["name"], { unique: true })
@Entity("applications", { schema: "public" })
export class Applications {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name", unique: true, length: 100 })
  name: string;

  @OneToMany(
    () => AppStyleVariants,
    (appStyleVariants) => appStyleVariants.application
  )
  appStyleVariants: AppStyleVariants[];

  @OneToMany(() => AppTokens, (appTokens) => appTokens.application)
  appTokens: AppTokens[];
}
