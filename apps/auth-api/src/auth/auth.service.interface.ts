import { IssueTokenPairPayload, TokenPair } from "./dto";

export interface AuthServiceInterface {
  issueToken(payload: IssueTokenPairPayload): Promise<TokenPair>;
  refreshToken(tokenPair: TokenPair): Promise<TokenPair>;
}
