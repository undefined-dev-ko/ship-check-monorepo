import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { AuthUtil } from "../common/authUtil";

const SHIPDA_EMAIL_SIGNATURE = "@ship-da.com";
@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private authUtil: AuthUtil;
  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(
      this.configService.get("GOOGLE_CLIENT_ID"),
      this.configService.get("GOOGLE_CLIENT_SECRET")
    );
    this.authUtil = new AuthUtil();
  }

  public async createAccessTokenByGoogleToken(
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.configService.get("GOOGLE_CLIENT_ID"),
    });

    const googlePayload = ticket.getPayload();

    if (!googlePayload.email.endsWith(SHIPDA_EMAIL_SIGNATURE)) {
      throw new ForbiddenException("not for your service");
    }

    return this.authUtil.createToken({
      email: googlePayload.email,
      name: googlePayload.name,
      picture: googlePayload.picture,
    });
  }

  public async refreshAccessToken(tokenPair: {
    accessToken: string;
    refreshToken: string;
  }) {
    return this.authUtil.refreshToken(tokenPair);
  }
}
