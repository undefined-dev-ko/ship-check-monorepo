import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthServiceGoogleImpl } from "./auth.service.google.impl";
import { IssueTokenPairGooglePayload, TokenPair } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authServiceGoogleImpl: AuthServiceGoogleImpl) {}

  @Post("login/google")
  @ApiOperation({
    summary: "구글 토큰으로 JWT 토큰 생성",
    description: "구글 로그인 토큰으로 JWT 토큰 생성한다",
  })
  async createAccessTokenByGoogleToken(
    @Body() payload: IssueTokenPairGooglePayload
  ): Promise<TokenPair> {
    return this.authServiceGoogleImpl.issueToken(payload);
  }

  @Post("refresh")
  @ApiOperation({
    summary: "JWT 토큰 리프레시",
    description: "JWT 토큰을 리프레시 한다",
  })
  async refreshToken(@Body() payload: TokenPair): Promise<TokenPair> {
    return this.authServiceGoogleImpl.refreshToken(payload);
  }
}
