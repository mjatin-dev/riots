import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Ranks } from "../entity/ranks.entity";
import { ranks } from "../common/seeds/ranks.seeds";

export default class RankSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      const rankRepository = dataSource.getRepository(Ranks);

      await Promise.all(
        ranks.map(async (data) => {
          const rank = new Ranks();
          rank.name = data.name;
          rank.image = data.image;

          await rankRepository.save(rank);
        })
      );

      console.log("Ranks seeded successfully.");
    } catch (error) {
      console.error("Error seeding Ranks:", error);
    }
  }
}
