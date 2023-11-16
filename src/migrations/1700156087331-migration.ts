import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700156087331 implements MigrationInterface {
    name = 'Migration1700156087331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ranks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "playersId" integer, CONSTRAINT "PK_7620a297228c6e9ed28e9fd07e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "summoner_name" character varying NOT NULL, "summoner_region" character varying NOT NULL, "win" integer NOT NULL DEFAULT '0', "kda" integer NOT NULL DEFAULT '0', "kills" integer NOT NULL DEFAULT '0', "cs_per_minuts" integer NOT NULL DEFAULT '0', "average_vision_score" integer NOT NULL DEFAULT '0', "assits" integer NOT NULL DEFAULT '0', "league_points" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ranks" ADD CONSTRAINT "FK_35c1a8b2bd8c6adc1c0f6a40ed5" FOREIGN KEY ("playersId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranks" DROP CONSTRAINT "FK_35c1a8b2bd8c6adc1c0f6a40ed5"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "ranks"`);
    }

}
