import { useEffect, useMemo, useState } from 'react';
import { TokenPair, User } from '../types';

const extractUserFromAccessToken = (accessToken: string | undefined) => {
  if (!accessToken) {
    return null;
  }
  const decodedPayload = atob(accessToken.split('.')[1]);
  return JSON.parse(decodedPayload) as User;
};

const getToken = (): string | undefined => {
  return localStorage.getItem('accessToken');
};

/** #FIXME 로그아웃시 isLoggedIn이 제대로 false 처리가 안됨. Provider나 recoil로 변경해야할듯 */
export const useTokenAuth = () => {
  const [tokenPair, setTokenPair] = useState<TokenPair>();

  const storeToken = (token: TokenPair) => {
    setTokenPair(structuredClone(token));
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  };

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setTokenPair(undefined);
    window.location.reload(); //  #FIXME 로그아웃시 isLoggedIn이 제대로 false 처리가 안됨. Provider나 recoil로 변경해야할듯 > 이 이슈 때문에 임시로 새로고침을 한다
  };

  const isLoggedIn = useMemo(() => {
    return !!tokenPair;
  }, [tokenPair]);

  return {
    storeToken,
    clearToken,
    isLoggedIn,
    tokenPair,
    user: extractUserFromAccessToken(tokenPair?.accessToken),
  };
};
