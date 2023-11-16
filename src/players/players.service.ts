import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Players } from "../entity/players.entity";
import { PlayersDto } from "./players.dto";
import { Ranks } from "../entity/ranks.entity";

@Injectable()
export class PlayersService {
  @InjectRepository(Players)
  private readonly repository: Repository<Players>;

  @InjectRepository(Ranks)
  private readonly ranksRepository: Repository<Ranks>;

  public async createPlayer(players: PlayersDto): Promise<Players> {
    const player = new Players();
    player.summoner_name = players.summoner_name;
    player.summoner_region = players.summoner_region;
    player.win = players.win;
    player.kda = players.kda;
    player.kills = players.kills;
    player.cs_per_minuts = players.cs_per_minuts;
    player.average_vision_score = players.average_vision_score;
    player.assits = players.assits;
    player.league_points = players.league_points;
    player.ranks = await this.ranksRepository.find({
      where: { id: parseInt(players.ranks) },
    });

    return this.repository.save(player);
  }

  public async getPlayers(condition, pagination): Promise<any> {
    const [list, count] = await Promise.all([
      this.repository.find({
        where: condition,
        relations: { ranks: true },
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.repository.count({ where: condition }),
    ]);

    return { list, count };
  }

  public async getPlayerSummary(condition): Promise<Players> {
    const player = await this.repository.findOne({
      relations: { ranks: true },
      where: condition,
    });

    return player;
  }

  public async getAllPlayers(): Promise<Players[]> {
    return await this.repository.find({});
  }

  public findPlayerPosition(summoner_name, summoner_region, scores, key) {
    const sortedScores = scores.sort((a, b) => b[key] - a[key]);
    const playerIndex = sortedScores.findIndex(
      (player) =>
        player.summoner_name === summoner_name &&
        summoner_region === summoner_region
    );

    return playerIndex !== -1 ? playerIndex + 1 : "Player not found";
  }
}
