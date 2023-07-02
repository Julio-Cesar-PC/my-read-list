import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from "../../components/layout";
import FollowersList from "../../components/FollowersList";
import FollowingList from "../../components/FollowingList";
import FollowBtn from '../../components/FollowBtn';
import UnfollowBtn from '../../components/UnfollowBtn';
import ProfileBookList from '../../components/ProfileBookList';
import { Modal } from 'flowbite-react';
 
export default function Page() {
  const router = useRouter()
  const id = router.query.id
  const [user, setUser] = useState<any>({})
  const [followBtn, setFollowBtn] = useState<any>(false)
  const [allAvaliacao, setAllAvaliacao] = useState<any>([])
  const [showModalSeguidores, setShowModalSeguidores] = useState(false);
  const [showModalSeguindo, setShowModalSeguindo] = useState(false);

  async function getProfile() {
    const response = await axios.get(`/api/auth/getProfileByUserId?id=${id}`)
    setUser(response.data)
  }

  async function checkFollow() {
    const response = await axios.get(`/api/follows/checkFollow?id=${id}`)
    .then((response) => {
      if (response.status === 200) {
        setFollowBtn(false)
      }  else {
        setFollowBtn(true)
      }
    })
    .catch((error) => {
      if (error.response.status === 303) {
        setFollowBtn(false)
      } else {
        setFollowBtn(true)
      }
    })
  }

  async function getAllAvaliacao() {
    await axios.get(`/api/avaliacao/getAllAvaliacaoById?id=${id}`)
    .then((response) => {
      if (response.data.length > 0) {
        setAllAvaliacao(response.data)
      }
    })
  }

  useEffect(() => {
    getProfile()
    checkFollow()
    getAllAvaliacao()
    setShowModalSeguidores(false)
    setShowModalSeguindo(false)
  }, [id])
  

  return (
    <Layout>
      <div className="flex flex-col py-2">
        <div className="mt-4 ml-11 mb-4 p-2 flex flex-col items-center justify-between rounded-lg shadow md:flex-row md:max-w-xl">
          <div className='flex'>
            <img
              className="p-2 object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={user?.image ?? "user-profile-placeholder.jpg"}
              alt=""
            />
            <div className="flex flex-col justify-center p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight">
                {user?.name}
              </h5>
              <p className="mb-3 font-normal">
                {user?.email}
              </p>
              {followBtn && <FollowBtn id={id} />}
              {!followBtn && <UnfollowBtn id={id} />}
            </div>
          </div>
        </div>
        <div className="mb-4 ml-11 flex gap-5">
        <h1 className="mb-2 btn btn-ghost">{allAvaliacao.length} livros avaliados</h1>
          
          <h1 onClick={() => setShowModalSeguidores(!showModalSeguidores)}
              className="mb-2 btn btn-ghost">
                {user?.followers?.length} seguidores
          </h1>
          <Modal show={showModalSeguidores}
                 onClose={() => setShowModalSeguidores(!showModalSeguidores)} >
            <Modal.Header>
              <h2 className="text-xl font-bold">Seguidores</h2>
            </Modal.Header>
            <Modal.Body>
              <FollowersList followers={user?.followers} />
            </Modal.Body>
          </Modal>

          <h1 onClick={() => setShowModalSeguindo(!showModalSeguindo)}
              className="mb-2 btn btn-ghost">
                {user?.following?.length} seguindo
          </h1>
          <Modal show={showModalSeguindo}
                 onClose={() => setShowModalSeguindo(!showModalSeguindo)}>
            <Modal.Header>
              <h2 className="text-xl font-bold">Seguindo</h2>
            </Modal.Header>
            <Modal.Body>
              <FollowingList followings={user?.following} />
            </Modal.Body>
          </Modal>
          </div>
        </div>
        <div className="divider">Availiações</div>
        <table className="mx-auto">
                <thead className="text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Capa
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Livro
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nota
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Paginas
                    </th>
                </tr>
              </thead>
              <tbody>  
                <ProfileBookList bookList={allAvaliacao} />
              </tbody>
          </table>
    </Layout>
  )
}