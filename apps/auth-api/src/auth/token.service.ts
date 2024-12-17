import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { createHash, randomUUID } from "crypto";
import * as jwt from "jsonwebtoken";
import { TokenPair, TokenPayload } from "./dto";

@Injectable()
export class TokenService {
  constructor() {}

  private createRefreshToken(): {
    refreshToken: string;
    hashedRefreshToken: string;
  } {
    const refreshToken = createHash("SHA-256")
      .update(randomUUID())
      .digest("base64");

    const hashedRefreshToken = createHash("SHA-256")
      .update(refreshToken)
      .digest("base64");

    return {
      refreshToken,
      hashedRefreshToken,
    };
  }

  public createToken(
    tokenPayload: Pick<TokenPayload, "email" | "name" | "photo">
  ): TokenPair {
    const { refreshToken, hashedRefreshToken } = this.createRefreshToken();

    const accessToken = jwt.sign(
      { ...tokenPayload, hashedRefreshToken } satisfies TokenPayload,
      process.env.SECRET as string,
      { expiresIn: "7d" }
    );

    const tokenPair = {
      accessToken,
      refreshToken,
    };

    return tokenPair;
  }

  public refreshToken(tokenPair: {
    accessToken: string;
    refreshToken: string;
  }) {
    const jwtPayload: TokenPayload = jwt.decode(
      tokenPair.accessToken
    ) as TokenPayload;

    if (
      jwtPayload.hashedRefreshToken ===
      createHash("SHA-256").update(tokenPair.refreshToken).digest("base64")
    ) {
      return this.createToken({
        name: jwtPayload.name,
        email: jwtPayload.email,
        photo: jwtPayload.photo,
      });
    }

    throw new BadRequestException("invalid ref sig");
  }

  public validateAccessToken(accessToken: string): TokenPair {
    const verified = jwt.verify(
      accessToken,
      process.env.SECRET as string
    ) as TokenPair;
    return verified;
  }
}
