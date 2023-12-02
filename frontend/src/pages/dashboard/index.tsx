import { withSSRAuth } from "@utils/withSSRAuth"
import Head from "next/head"
import { Header } from '@components/Header/'

export default function Dashboard(){
  return(
    <>
    <Head>
      <title>
        Dashboard Pizzafun 
      </title>
      </Head>

      <div>
        <Header />
      </div>    
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})