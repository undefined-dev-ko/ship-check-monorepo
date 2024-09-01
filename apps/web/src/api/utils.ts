import { TokenPair } from '../types';

export const makeAuthorization = (tokenPair: TokenPair) => ({
  Authorization: `Bearer ${tokenPair.accessToken}`,
});
