import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class IssueTokenPairGooglePayload {
  @ApiProperty()
  @IsString()
  authorizationCode: string;
}

export type IssueTokenPairPayload = IssueTokenPairGooglePayload;

export class TokenPair {
  @ApiProperty()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class TokenPayload {
  name: string;
  email: string;
  photo: string;
  hashedRefreshToken: string;
}
