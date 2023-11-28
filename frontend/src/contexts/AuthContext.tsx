import { type } from 'os';
import { createContext, ReactNode, useState } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export function signOut(){
  try {
    destroyCookie(undefined, '@pizzafun.token')
    Router.push('/');
  } catch (error) {
    error
  }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    console.log("email ", email);
    console.log("senha ", password);
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}