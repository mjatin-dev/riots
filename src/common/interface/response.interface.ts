import { Players } from "src/entity/players.entity";

export interface PlayersResponse {
  status: number;
  message: string;
  data: Players[];
}

export interface PlayerSummaryResponse {
  status: number;
  message: string;
  data: Players;
}

export interface PlayersLeaderBoardResponse {
  status: number;
  message: string;
  data: { leaguePoints: { top: number }; winRate: { top: number } };
}
