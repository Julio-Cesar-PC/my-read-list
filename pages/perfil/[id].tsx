import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from "../../components/layout";
import FollowersList from "../../components/FollowersList";
import FollowingList from "../../components/FollowingList";
 
export default function Page() {
  const router = useRouter()
  const id = router.query.id
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    async function getProfile() {
      const user = await axios.get(`/api/auth/getProfileByUserId?id=${id}`)
      setUser(user.data)
    }
    getProfile()
  }, [id])
  

  return (
    <Layout>
      <a className="mt-4 ml-11 mb-4 p-2 flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl">
        <img
          className="p-2 object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={user?.image ?? "user-profile-placeholder.jpg"}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {user?.name}
          </h5>
          <p className="mb-3 font-normal">
            {user?.email}
          </p>
        </div>
      </a>
      <div className="mb-4 ml-11">
        <input id="search" className="mb-4 border-gray-300 border-2 rounded-md" placeholder="Pesquise por pessoas..."></input>
        <button className="ml-2 bg-primary text-white p-1 rounded-md hover:bg-primaryLight" type="submit">Pesquisar</button>
        <h1 className="mb-2">Seguidores</h1>
        <div className="flex gap-4">
          <FollowersList followers={user?.followers} />
        </div>
        <h1 className="mb-2">Seguindo</h1>
        <div className="flex gap-4">
          <FollowingList followings={user?.following} />
        </div>
      </div>
    </Layout>
  )
}