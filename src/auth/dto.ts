import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessTokenByGoogleRequest {
  @ApiProperty()
  authorizationCode: string;
}
export class TokenPair {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
