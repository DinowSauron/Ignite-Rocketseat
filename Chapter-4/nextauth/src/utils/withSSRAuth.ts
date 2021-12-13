import decode from 'jwt-decode';
import { AuthTokenError } from './../services/errors/AuthTokenError';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from "nookies";
import { validadeUserAccess } from './ValidateUserAccess';

type SSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}


export function withSSRAuth<P = unknown>(fn: GetServerSideProps<P>, options?: SSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["nextauth.token"];
  
    if(!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }

    if(options) {
      const user = decode<{permissions: string[], roles: string[]}>(token);
      const {permissions, roles} = options;
      const userHasValidAccess = validadeUserAccess({user, permissions, roles});

      if(!userHasValidAccess) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          }
        }
      }
    }
    // console.log(user)

    try {
      return await fn(ctx)
    } catch(err) {
      if(err instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token")
        destroyCookie(ctx, "nextauth.refreshToken")
  
        return {
          redirect: {
            destination: "/",
            permanent: false
          }
        }
      }
    }
  }
}
