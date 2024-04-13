import { Injectable } from "@nestjs/common";
import { required } from "./utils";

// https://medium.com/@datails/nestjs-keep-it-simple-stupid-4101d8bdf59c 참고
@Injectable()
export class ConfigService {
  constructor() {}

  getPort() {
    return parseInt(process.env.PORT, 10) || 8080;
  }

  getDatabaseConfiguration() {
    return {
      host: required(process.env.DATABASE_HOST),
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      db: required(process.env.DATABASE_DB),
      name: required(process.env.DATABASE_NAME),
      password: process.env.DATABASE_PASSWORD,
    };
  }
}
