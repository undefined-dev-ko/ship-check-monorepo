import { randomUUID, createHash } from "crypto";
import * as jwt from "jsonwebtoken";

export type JwtPayload = {
  name: string;
  email: string;
  picture?: string;
  refSig: string;
};

export class AuthUtil {
  private static secret: string = process.env.SECRET || randomUUID();
  constructor() {}

  public createToken(
    jwtPayload: Pick<JwtPayload, "email" | "name" | "picture">
  ): {
    accessToken: string;
    refreshToken: string;
  } {
    const refreshToken = createHash("SHA-256")
      .update(randomUUID())
      .digest("base64");

    const accessToken = jwt.sign(
      Object.assign(jwtPayload, {
        refSig: createHash("SHA-256").update(refreshToken).digest("base64"),
      }),
      AuthUtil.secret,
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
    const jwtPayload = this.validateAccessToken(tokenPair.accessToken);

    if (
      jwtPayload.refSig ===
      createHash("SHA-256").update(tokenPair.refreshToken).digest("base64")
    ) {
      return this.createToken({
        email: jwtPayload.email,
        name: jwtPayload.name,
        picture: jwtPayload.picture,
      });
    }

    throw new Error("nonono");
  }

  public validateAccessToken(accessToken: string): JwtPayload {
    const verified = jwt.verify(accessToken, AuthUtil.secret) as JwtPayload;
    return verified;
  }
}
