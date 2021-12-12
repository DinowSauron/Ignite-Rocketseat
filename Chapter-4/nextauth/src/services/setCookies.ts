import { setCookie } from "nookies";
import { api } from "./api";


export function setCookiesWithToken(token, refreshToken = undefined) {
  setCookie(undefined, "nextauth.token", token, {
    maxAge: 60 * 60 * 2, // coloque um valor bem grande (tipo 30 dias)
    path: "/", // quem vai ter acesso ao cookie
  });
  if(refreshToken) {
    setCookie(undefined, "nextauth.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 2, // coloque um valor bem grande (tipo 30 dias)
      path: "/", // quem vai ter acesso ao cookie
    });
  }
  
  api.defaults.headers["Authorization"] = `Bearer ${token}`
}