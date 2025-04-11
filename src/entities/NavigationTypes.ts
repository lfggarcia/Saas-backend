import { Column, Entity, Index, OneToMany } from "typeorm";
import { Navigations } from "./Navigations";

@Index("PK_53e49d829f52544a909532249a5", ["id"], { unique: true })
@Index("navigation_types_pkey", ["id"], { unique: true })
@Index("navigation_types_name_key", ["name"], { unique: true })
@Index("UQ_cdcf0fbed57bc1d2bdca0e1cbff", ["name"], { unique: true })
@Entity("navigation_types", { schema: "public" })
export class NavigationTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @OneToMany(() => Navigations, (navigations) => navigations.type)
  navigations: Navigations[];
}
