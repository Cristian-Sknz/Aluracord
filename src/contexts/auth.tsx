import React, { useCallback, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { getUser, signIn } from 'src/lib/api';
import Router from 'next/router';

export type GithubUser = {
  id: number;
  name: string;
  username: string;
  bio: string;
  location: string;
  createdAt: string;
  publicRepos: number;
  followers: number;
  following: number;
};

type AuthContextType = {
  isAutenticated: boolean;
  user: GithubUser;
  authenticate(name: string): void;
};

export const AuthContext = React.createContext({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<GithubUser>();

  useEffect(() => fetchUser());

  const fetchUser = useCallback(() => {
    const { 'aluracord-token': token } = parseCookies();
    if (!token) {
      return;
    }
    getUser(token).then(async (response) => {
      if (response.status !== 200) {
        return;
      }
      setUser((await response.json()) as GithubUser);
    });
  }, []);

  const authenticate = useCallback((name: string) => {
      if (user) return;
      signIn(name).then(async (response) => {
        if (response.status !== 200) {
          return;
        }
        const { token, expires } = await response.json();
        setCookie(null, 'aluracord-token', token, {
          maxAge: expires,
        });
        Router.push('/chat').then(fetchUser);
      });
    }, [user]);

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        user,
        isAutenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
