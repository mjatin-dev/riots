import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class PlayersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  summoner_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  summoner_region: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  win: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  kda: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  kills: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cs_per_minuts: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  average_vision_score: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  assits: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  league_points: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  ranks: string;
}
