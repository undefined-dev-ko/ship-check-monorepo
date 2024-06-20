import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

// https://docs.nestjs.com/recipes/sql-typeorm
// https://docs.nestjs.com/techniques/database

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.getDatabaseConfig();
        const nodeEnv = configService.getNodeEnv();
        return {
          type: "mysql",
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.name,
          password: databaseConfig.password,
          database: databaseConfig.db,
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          synchronize: nodeEnv === "dev",
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          // dropSchema: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
