import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Players } from "./players.entity";

@Entity()
export class Ranks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => Players, (Players) => Players.ranks)
  players: Players;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
