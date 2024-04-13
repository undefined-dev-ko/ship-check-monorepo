import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReservationController } from "./reservation/reservation.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule],
  controllers: [AppController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
