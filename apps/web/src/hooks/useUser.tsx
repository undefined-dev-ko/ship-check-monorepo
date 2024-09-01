import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useUser = () => {
  const value = useContext(UserContext);
  if (value === undefined) {
    throw new Error('no user context provided');
  }
  return value;
};
