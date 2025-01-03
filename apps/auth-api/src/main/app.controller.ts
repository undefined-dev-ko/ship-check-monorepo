import { AppService } from "./app.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/authGuard";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Public } from "src/auth/decorators";

@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: "앱 생존신고용 API" })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("auth")
  @ApiOperation({ summary: "JWT 토큰 확인용 API" })
  checkauth(): string {
    return "ok";
  }
}
