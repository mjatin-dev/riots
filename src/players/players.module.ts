import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Players } from "../entity/players.entity";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { Ranks } from "../entity/ranks.entity";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [TypeOrmModule.forFeature([Players, Ranks])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
