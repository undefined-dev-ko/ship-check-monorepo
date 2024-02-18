import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReservationController } from "./reservation/reservation.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
