import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./main/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import express from "express";
import helmet from "helmet";
require("source-map-support").install();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://127.0.0.1",
      "http://127.0.0.1:3000",
      "http://localhost",
      "http://localhost:3000",
      "https://ship-check-fe-prv.vercel.app",
      "https://ship-check-fe-prv.vercel.app/",
      "https://check.ship-da.com",
      "https://check.ship-da.com/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.use(
    express.urlencoded({
      limit: "20mb",
      extended: true,
    })
  );

  app.use(
    express.json({
      limit: "20mb",
    })
  );

  app.use(helmet({ hidePoweredBy: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle("Ship-Check 쉽다 출석부 API")
    .setDescription("쉽다의 사무실 자리예약 API 문서입니다.")
    .setVersion("1.0")
    .addTag("cats")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
