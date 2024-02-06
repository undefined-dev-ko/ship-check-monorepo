import { AppService } from "./app.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard, Public } from "./common/authGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("auth")
  checkauth(): string {
    return "ok";
  }
}
