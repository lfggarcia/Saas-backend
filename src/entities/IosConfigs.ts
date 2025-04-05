import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Applications } from "./Applications";

@Index("ios_configs_pkey", ["id"], { unique: true })
@Entity("ios_configs", { schema: "public" })
export class IosConfigs {
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

  @Column("text", { name: "provisioning_profile", nullable: true })
  provisioningProfile: string | null;

  @Column("text", { name: "p12_cert", nullable: true })
  p12Cert: string | null;

  @Column("jsonb", { name: "entitlements", nullable: true })
  entitlements: object | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Applications, (applications) => applications.iosConfigs)
  @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
  application: Applications;
}
