import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Applications } from "./Applications";

@Index("android_configs_pkey", ["id"], { unique: true })
@Entity("android_configs", { schema: "public" })
export class AndroidConfigs {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", {
    name: "display_name",
    nullable: true,
    length: 255,
  })
  displayName: string | null;

  @Column("character varying", {
    name: "bundle_id",
    nullable: true,
    length: 255,
  })
  bundleId: string | null;

  @Column("text", { name: "keystore_file", nullable: true })
  keystoreFile: string | null;

  @Column("text", { name: "keystore_password", nullable: true })
  keystorePassword: string | null;

  @Column("character varying", {
    name: "package_name",
    nullable: true,
    length: 255,
  })
  packageName: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Applications, (applications) => applications.androidConfigs)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;
}
