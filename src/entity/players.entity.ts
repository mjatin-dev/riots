import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ranks } from "./ranks.entity";

@Entity()
export class Players {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summoner_name: string;

  @Column()
  summoner_region: string;

  @Column({ default: 0 })
  win: number;

  @Column({ default: 0 })
  kda: number;

  @Column({ default: 0 })
  kills: number;

  @Column({ default: 0 })
  cs_per_minuts: number;

  @Column({ default: 0 })
  average_vision_score: number;

  @Column({ default: 0 })
  assits: number;

  @Column({ default: 0 })
  league_points: number;

  @OneToMany(() => Ranks, (Ranks) => Ranks.players)
  ranks: Ranks[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
