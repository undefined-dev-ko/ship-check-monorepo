import { useEffect, useMemo, useState } from 'react';
import { TokenPair, User } from '../types';
import { useAtom } from 'jotai';
import { IS_LOGGED_IN } from '../states/atoms';

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
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);

  const storeToken = (token: TokenPair) => {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);

    setIsLoggedIn(true);
  };

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setIsLoggedIn(false);
  };

  // 브라우저 refresh 하는 경우, 토큰을 local storage 에서 다시 가져와서 바인딩.
  useEffect(() => {
    const token = getToken();

    if (!isLoggedIn && token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return {
    storeToken,
    clearToken,
    isLoggedIn,
  };
};
