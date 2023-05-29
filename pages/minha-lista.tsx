import Layout from "../components/layout"
import { useSession } from "next-auth/react"

export default function IndexPage() {
  const { data: session, status } = useSession()

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>BEM VINDO!</h1>
        <h2>{`Hello ${session?.user?.name}`}</h2>
      </div>
    </Layout>
  )
}
