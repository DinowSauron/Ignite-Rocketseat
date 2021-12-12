import { destroyCookie, setCookie } from 'nookies';
import { parseCookies } from 'nookies';
import axios, {AxiosError} from "axios";
import { setCookiesWithToken } from './setCookies';
import { signOut } from './contexts/AuthContext';


let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
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


      cookies = parseCookies();

      const { "nextauth.refreshToken": refreshToken} = cookies;
      const originalConfig = error.config;

      

      if(!isRefreshing) {
        isRefreshing = true;

        api.post("/refresh", {
          refreshToken,
        }).then(response => {

          const {token} = response.data;
  
          setCookiesWithToken(token, response.data.refreshToken);

          // pega as requisições falhadas e as executa quando a primeira terminar
          failedRequestQueue.forEach(request => request.onSuccess(token)) 
          failedRequestQueue = [];
        }).catch(err => {
          failedRequestQueue.forEach(request => request.onFailure(err)) 
          failedRequestQueue = [];

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
      signOut();
    }
  }

  return Promise.reject(error)
})
