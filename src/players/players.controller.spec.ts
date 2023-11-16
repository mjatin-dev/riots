import { Test, TestingModule } from "@nestjs/testing";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";

describe("PlayersController", () => {
  let controller: PlayersController;
  let playersService: PlayersService;

  beforeEach(async () => {
  
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getPlayers", () => {
    it("should return an array of players", async () => {
      const result: any = ["test"];
      jest.spyOn(playersService, "getPlayers").mockImplementation(() => result);

      const condition: any = {
        summoner_name: "TTV LegitKorea",
        summoner_region: "NA1",
      };
      const pagination = { skip: 0, take: 10 };
      expect(await playersService.getPlayers(condition, pagination)).toBe(
        result
      );
    });
  });
});
