import React, { useCallback, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { getUser, signIn } from 'src/lib/api';
import Jwt from 'jsonwebtoken'; 
import Router from 'next/router';
import { GithubUser } from './types';

type AuthContextType = {
  isAutenticated: boolean;
  loading: boolean;
  user: GithubUser;
  authenticate(name: string): void;
  logout(): void;
};

const AuthContext = React.createContext({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<GithubUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => fetchUser(), []);

  const fetchUser = useCallback(() => {
    const { 'aluracord-token': token } = parseCookies();
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getUser(token).then(async (response) => {
      if (response.status !== 200) {
        setLoading(false);
        return;
      }
      setUser((await response.json()) as GithubUser);
      setLoading(false);
    });
  }, []);

  const authenticate = useCallback((name: string) => {
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
  }, []);

  const logout = useCallback(() => {
    const { 'aluracord-token': token } = parseCookies();
    if (!token) {
      return;
    }
    destroyCookie(null, 'aluracord-token');
    Router.push('/').then(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAutenticated: !!user,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const isValidToken = (ctx?: any) => {
  const { 'aluracord-token': token } = parseCookies(ctx);
  try {
    if (token) {
      Jwt.verify(token, process.env.APPLICATION_SECRET);
      return true;
    }
  } catch (ignore) {
    destroyCookie(ctx, 'aluracord-token');
  }
  return false;
};

export const useAuth = () => React.useContext(AuthContext);
export default AuthProvider;
