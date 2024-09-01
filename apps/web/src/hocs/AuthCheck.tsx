import React from 'react';
import { useTokenAuth } from '../hooks/useTokenAuth';

const AuthCheck = (TargetComponent: React.ComponentType<unknown>) => {
  const AuthenticateCheck = () => {
    const { isLoggedIn } = useTokenAuth();

    if (!isLoggedIn) {
      return <>authentication이 안되어있어요</>;
    }
    return <TargetComponent />;
  };

  return AuthenticateCheck;
};

export default AuthCheck;
