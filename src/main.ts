import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { join } from "path";
require("dotenv").config();

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "..", "static"));
  //app.useGlobalPipes(new ValidationPipe());
  //app.enableCors();

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const configs = new DocumentBuilder()
    .setTitle("Riot")
    .setDescription("The RIOT API description")
    .setVersion("1.0")
    .addTag("Riot")
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
