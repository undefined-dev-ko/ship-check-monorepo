import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessTokenByGoogleRequest {
  @ApiProperty()
  token: string;
}
export class TokenPair {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
