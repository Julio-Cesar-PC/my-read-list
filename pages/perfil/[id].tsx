import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <h1>profile: {router.query.id}</h1>
}