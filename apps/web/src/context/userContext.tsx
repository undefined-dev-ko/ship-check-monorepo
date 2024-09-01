import { createContext, useMemo, useState } from 'react';
import { User } from '../types';

interface IUserContext {
  user: User | null;
  actions: {
    storeUser: (user: User) => void;
  };
}

export const UserContext = createContext<IUserContext>({
  user: null,
  actions: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const actions = useMemo(
    () => ({ storeUser: (user: User) => setUser(user) }),
    [],
  );
  const value = useMemo(() => ({ user, actions }), [user, actions]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
