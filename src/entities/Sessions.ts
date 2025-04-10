import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("sessions_pkey", ["id"], { unique: true })
@Index("PK_3238ef96f18b355b671619111bc", ["id"], { unique: true })
@Index("UQ_e9f62f5dcb8a54b84234c9e7a06", ["token"], { unique: true })
@Index("sessions_token_key", ["token"], { unique: true })
@Entity("sessions", { schema: "public" })
export class Sessions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "token" })
  token: string;

  @Column("text", { name: "ip_address", nullable: true })
  ipAddress: string | null;

  @Column("text", { name: "user_agent", nullable: true })
  userAgent: string | null;

  @Column("timestamp with time zone", { name: "expires_at", nullable: true })
  expiresAt: Date | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.sessions, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
