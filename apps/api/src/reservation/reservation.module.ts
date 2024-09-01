import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";

import { ReservationService } from "./reservation.service";
import { DatabaseModule } from "../database/database.module";
import { ReservationController } from "./reservation.controller";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
