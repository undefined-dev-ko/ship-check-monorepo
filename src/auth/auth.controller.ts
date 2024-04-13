import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUtil } from "../common/authUtil";
import { CreateAccessTokenByGoogleRequest, TokenPair } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login/test")
  @ApiOperation({
    summary: "테스트 JWT 토큰 생성",
    description: "테스트용 JWT 토큰을 생성한다 개발 끝나면 없애줘요",
  })
  async createAccessTokenTest(): Promise<TokenPair> {
    return new AuthUtil().createToken({
      id: 9999,
      email: "test@ship-da.com",
      name: "tester",
      photo: "abc",
      team: "etc",
    });
  }

  @Post("login/google")
  @ApiOperation({
    summary: "구글 토큰으로 JWT 토큰 생성",
    description: "구글 로그인 토큰으로 JWT 토큰 생성한다",
  })
  async createAccessTokenByGoogleToken(
    @Body() payload: CreateAccessTokenByGoogleRequest
  ): Promise<TokenPair> {
    return this.authService.createAccessTokenByGoogleAuthorizationCode(
      payload.authorizationCode
    );
  }

  @Post("refresh")
  @ApiOperation({
    summary: "JWT 토큰 리프레시",
    description: "JWT 토큰을 리프레시 한다",
  })
  async refreshToken(@Body() payload: TokenPair): Promise<TokenPair> {
    return this.authService.refreshAccessToken(payload);
  }
}
