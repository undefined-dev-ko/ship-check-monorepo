import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUtil } from "../common/authUtil";
import { CreateAccessTokenByGoogleRequest, TokenPair } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login/test")
  async createAccessTokenTest(): Promise<TokenPair> {
    return new AuthUtil().createToken({
      email: "test@ship-da.com",
      name: "tester",
      picture: "",
    });
  }

  @Post("login/google")
  async createAccessTokenByGoogleToken(
    @Body() payload: CreateAccessTokenByGoogleRequest
  ): Promise<TokenPair> {
    return this.authService.createAccessTokenByGoogleToken(payload.token);
  }

  @Post("refresh")
  async refreshToken(@Body() payload: TokenPair): Promise<TokenPair> {
    return this.authService.refreshAccessToken(payload);
  }
}
