import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data: session, status } = useSession()

  if (!session) {
    
  }

  return (
    <Layout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  )
}
