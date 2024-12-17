import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { ConfigService } from "../config/config.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { IssueTokenPairGooglePayload, TokenPair } from "./dto";
import { TokenService } from "./token.service";

const SHIPDA_EMAIL_SIGNATURE = "@ship-da.com";

@Injectable()
export class AuthServiceGoogleImpl implements AuthServiceInterface {
  private client: OAuth2Client;

  private googleAuthConfig: {
    clientId: any;
    clientSecret: any;
    redirectUri: any;
  };
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {
    this.googleAuthConfig = this.configService.getGoogleAuthConfig();
    this.client = new OAuth2Client(
      this.googleAuthConfig.clientId,
      this.googleAuthConfig.clientSecret,
      this.googleAuthConfig.redirectUri
    );
  }

  public async issueToken(
    payload: IssueTokenPairGooglePayload
  ): Promise<TokenPair> {
    const { authorizationCode } = payload;
    const getTokenResponse = await this.client.getToken(authorizationCode);
    const token = getTokenResponse.tokens.id_token;

    if (!token) {
      throw new UnauthorizedException("token not generated");
    }

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.googleAuthConfig.clientId,
    });

    const googlePayload = ticket.getPayload();

    if (!googlePayload) {
      throw new UnauthorizedException("fail to get ticket payload");
    }

    if (!googlePayload.email?.endsWith(SHIPDA_EMAIL_SIGNATURE)) {
      throw new ForbiddenException("unauthorized service");
    }

    return this.tokenService.createToken({
      email: googlePayload.email,
      name: googlePayload.name ?? "Empty",
      photo: googlePayload.picture || "",
    });
  }

  public async refreshToken(tokenPair: {
    accessToken: string;
    refreshToken: string;
  }) {
    return this.tokenService.refreshToken(tokenPair);
  }
}
