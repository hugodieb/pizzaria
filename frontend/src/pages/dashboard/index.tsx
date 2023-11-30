import { withSSRAuth } from "@utils/withSSRAuth"

export default function Dashboard(){
  return(
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})