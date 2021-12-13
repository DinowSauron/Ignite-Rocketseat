import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../apiClient";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import { setCookiesWithToken } from "../../utils/setCookies";
import { AuthTokenError } from "../errors/AuthTokenError";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch(message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if(token) {
      api.get("/me").then(res => {
        const { email, permissions, roles} = res.data;

        setUser({email, permissions, roles})
      }).catch(() => {
        signOut()
        setUser(undefined);
      })
    }
  }, [])

  

  async function signIn({email, password}: SignInCredentials) {
    
    try {
      const response = await api.post("sessions", {
        email,
        password
      });

      const { permissions, roles, token, refreshToken } = response.data;

      // sessionStorage -> se fechar e abrir perde os dados
      // localstorage -> fica guardado localmente (backend não tem acesso)
      // cookies -> fica guardado localmente (backend pode acessar os cookies facilmente)

      setCookiesWithToken(token, refreshToken);

      setUser({
        email,
        permissions,
        roles
      })

      Router.push("/dashboard");
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}