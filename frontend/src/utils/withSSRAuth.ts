import { AuthTokenError } from '@services/errors/AuthTokenError';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>){
  
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    
    const cookies = parseCookies(ctx);

    const token = cookies[process.env.NAME_TOKEN];

    if(!token){
      return{
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }else{
      try {
        return await fn(ctx);        
      } catch (error) {
        if(error instanceof AuthTokenError){
          destroyCookie(ctx, process.env.NAME_TOKEN);
          
          return{
            redirect: {
              destination: "/",
              permanent: false,
            }
          }
        }                
      }
    }
  }
}