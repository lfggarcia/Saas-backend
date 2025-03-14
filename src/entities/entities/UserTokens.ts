import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("user_tokens_pkey", ["idToken"], { unique: true })
@Entity("user_tokens", { schema: "public" })
export class UserTokens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_token" })
  idToken: number;

  @Column("character varying", { name: "token", length: 255 })
  token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @ManyToOne(() => Users, (users) => users.userTokens)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}
