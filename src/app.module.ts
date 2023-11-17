import { Module, CacheModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PlayersModule } from "./players/players.module";
import { Players } from "./entity/players.entity";
import { Ranks } from "./entity/ranks.entity";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "54.79.223.218",
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "riot",
      synchronize: false,
      logging: true,
      entities: [Players, Ranks],
      migrations: ["src/migrations/*{.ts}"],
      subscribers: [],
    }),
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
