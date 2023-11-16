import {
  Body,
  CacheTTL,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";

import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PlayersService } from "./players.service";
import { Players } from "src/entity/players.entity";
import { PlayersDto } from "./players.dto";
import { NotFoundError } from "rxjs";
import {
  PlayerSummaryResponse,
  PlayersLeaderBoardResponse,
  PlayersResponse,
} from "src/common/interface/response.interface";
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@ApiTags("Players")
@Controller("")
export class PlayersController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  @Inject(PlayersService)
  private readonly service: PlayersService;

  @Post()
  @HttpCode(201)
  create(@Body() playersDto: PlayersDto): Promise<Players> {
    try {
      return this.service.createPlayer(playersDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        "An error occurred creating record",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey("all-players")
  @Get("players/:summonerName/:summonerRegion/:size/:limit")
  @ApiParam({ name: "summonerName" })
  @ApiParam({ name: "summonerRegion" })
  @ApiParam({ name: "size" })
  @ApiParam({ name: "limit" })
  @ApiQuery({
    name: "queueid",
    enum: [
      "RANKED_SOLO_5x5",
      "RANKED_FLEX_SR",
      "NORMAL_BLIND_PICK",
      "NORMAL_DRAFT_PICK",
      "ARAM",
      "ALL",
    ],
  })
  @HttpCode(200)
  public async getPlayers(
    @Param("summonerName") summonerName: string,
    @Param("summonerRegion") summonerRegion: string,
    @Param("size") size: string,
    @Param("limit") limit: string,
    @Query("queueid") queueid: string
  ): Promise<PlayersResponse> {
    try {
      let data: Players[] = await this.cacheManager.get("all-players");
      if (data)
        return {
          status: 200,
          message: "Players list",
          data,
        };
      else {
        const condition: any = {
          summoner_name: summonerName,
          summoner_region: summonerRegion,
        };

        if (queueid !== "ALL") {
          condition.ranks = {
            name: queueid,
          };
        }

        const pagination = { skip: size, take: limit };
        data = await this.service.getPlayers(condition, pagination);
        this.cacheManager.set("all-players", data);

        return {
          status: 200,
          message: "Players list",
          data,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }

 
  @Get("player/:summonerName/:summonerRegion/:playerId")
  @ApiParam({ name: "summonerName" })
  @ApiParam({ name: "summonerRegion" })
  @ApiParam({
    name: "playerId",
  })
  @HttpCode(200)
  public async getPlayerById(
    @Param("summonerName") summonerName: string,
    @Param("summonerRegion") summonerRegion: string,
    @Param("playerId") playerId: string
  ): Promise<PlayerSummaryResponse> {
    try {
      const condition: any = {
        summoner_name: summonerName,
        summoner_region: summonerRegion,
        id: parseInt(playerId),
      };
      const data = await this.service.getPlayerSummary(condition);

      return {
        status: 200,
        message: "Players leaderboard",
        data,
      };
      return;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey("all-players")
  @Get("leaderboard/:summonerName/:summonerRegion")
  @ApiParam({ name: "summonerName" })
  @ApiParam({ name: "summonerRegion" })
  @HttpCode(200)
  public async getPlayerLeaderboard(
    @Param("summonerName") summonerName: string,
    @Param("summonerRegion") summonerRegion: string
  ): Promise<PlayersLeaderBoardResponse> {
    try {
      let list: Players[] = await this.cacheManager.get("all-players");

      const players =
        list?.length > 0 ? list : await this.service.getAllPlayers();

      const leaguePoints = this.service.findPlayerPosition(
        summonerName,
        summonerRegion,
        players,
        "league_points"
      );

      const winRate = this.service.findPlayerPosition(
        summonerName,
        summonerRegion,
        players,
        "win"
      );

      const data = {
        leaguePoints: { top: leaguePoints },
        winRate: { top: winRate },
      };
      return {
        status: 200,
        message: "Players leaderboard",
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }
}
