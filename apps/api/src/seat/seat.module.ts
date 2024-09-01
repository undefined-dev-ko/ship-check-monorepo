import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
