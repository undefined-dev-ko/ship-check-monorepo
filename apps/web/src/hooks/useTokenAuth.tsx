import { useEffect } from 'react';
import { TokenPair } from '../types';
import { useAtom } from 'jotai';
import { IS_LOGGED_IN } from '../states/atoms';

const getToken = () => {
  return localStorage.getItem('accessToken');
};

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
