import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "../config/config.module";
import { AuthServiceGoogleImpl } from "./auth.service.google.impl";
import { TokenService } from "./token.service";

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthServiceGoogleImpl, TokenService],
})
export class AuthModule {}
