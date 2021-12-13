import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';
import axios, {AxiosError} from "axios";
import { signOut } from './contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';


let isRefreshing = false;
let failedRequestQueue = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  
  const api = axios.create({
    baseURL: "http://localhost:3333", // url do backend
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`
    }
  });


  // axios interceptors
  api.interceptors.response.use(res => {
    return res
  }, (error: AxiosError) => {
    // console.log(error)

    if(error.response.status === 401) {
      if(error.response.data?.code === "token.expired") { // lidar com token expirado para poder renova-lo
        

        const { "nextauth.refreshToken": refreshTokenCookie} = cookies;
        const originalConfig = error.config;



        if(!isRefreshing) {
          isRefreshing = true;

          // console.log("Refreshing...")

          api.post("/refresh", {
            refreshToken: refreshTokenCookie,
          }).then(response => {
            const {token, refreshToken} = response.data;
    
            setCookie(ctx, "nextauth.token", token, {
              maxAge: 60 * 60 * 2, // coloque um valor bem grande (tipo 30 dias)
              path: "/", // caminhos que terão acesso ao cookie
            });

            setCookie(ctx, "nextauth.refreshToken", refreshToken, {
              maxAge: 60 * 60 * 2, 
              path: "/",
            });
            
            api.defaults.headers["Authorization"] = `Bearer ${token}`
            // pega as requisições falhadas e as executa quando a primeira terminar
            failedRequestQueue.forEach(request => request.onSuccess(token)) 
            failedRequestQueue = [];
          }).catch(err => {
            failedRequestQueue.forEach(request => request.onFailure(err)) 
            failedRequestQueue = [];

            if(process.browser) {
              signOut()
            }

          }).finally(() => {
            isRefreshing = false;
          });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({ 
            onSuccess: (token: string) => { //resolve
              originalConfig.headers["Authorization"] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => { //reject
              reject(err)
            }, 
          })
        })
      }else{
        if(process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }

    return Promise.reject(error)
  });

  return api
}