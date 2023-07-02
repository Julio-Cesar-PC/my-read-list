import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

export default function MePage() {
  const { data: session, status } = useSession();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [lastAvaliacao, setLastAvaliacao] = useState({});
  const [allAvaliacao, setAllAvaliacao] = useState([]);
  const [showModalSeguidores, setShowModalSeguidores] = useState(false);
  const [showModalSeguindo, setShowModalSeguindo] = useState(false);

  async function getFollowers() {
    const response = await axios.get("/api/follows/getAllFollowers");
    setFollowers(response.data);
  }

  async function getFollowing() {
    const response = await axios.get("/api/follows/getAllFollowings");
    setFollowing(response.data);
  }

  async function getLastAvaliacao() {
    const response = await axios.get("/api/avaliacao/getLastAvaliacaoBySession");
    setLastAvaliacao(response.data);
    console.log(response.data)
  }

  async function getAllAvaliacaoBySession() {
    const response = await axios.get("/api/avaliacao/getAllAvaliacaoBySession");
    setAllAvaliacao(response.data);
  }

  useEffect(() => {
    getFollowers();
    getFollowing();
    getLastAvaliacao();
    getAllAvaliacaoBySession();
  }, [session]);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen py-2">
        <div className="mt-4 ml-11 mb-4 p-2 flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl">
          <img
            className="p-2 object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={session?.user?.image ?? ""}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              {session?.user?.name}
            </h5>
            <p className="mb-3 font-normal">
              {session?.user?.email}
            </p>
            {/* <p className="mb-3 font-normal">
              Ultima avaliação: {lastAvaliacao?.Livros?.titulo}
            </p> */}
          </div>
        </div>
        <div className="mb-4 ml-11 flex gap-5">
          <a href="/minha-lista" className="mb-2 btn btn-ghost">{allAvaliacao.length} livros avaliados</a>
          
          <h1 onClick={() => setShowModalSeguidores(!showModalSeguidores)}
              className="mb-2 btn btn-ghost">
                {followers.length} seguidores
          </h1>
          <Modal show={showModalSeguidores}
                 onClose={() => setShowModalSeguidores(!showModalSeguidores)} >
            <Modal.Header>
              <h2 className="text-xl font-bold">Seguidores</h2>
            </Modal.Header>
            <Modal.Body>
              <div className="flex gap-2">
                <FollowersList followers={followers} />
              </div>
            </Modal.Body>
          </Modal>

          <h1 onClick={() => setShowModalSeguindo(!showModalSeguindo)}
              className="mb-2 btn btn-ghost">
                {following.length} seguindo
          </h1>
          <Modal show={showModalSeguindo}
                 onClose={() => setShowModalSeguindo(!showModalSeguindo)}>
            <Modal.Header>
              <h2 className="text-xl font-bold">Seguindo</h2>
            </Modal.Header>
            <Modal.Body>
              <div className="flex gap-2">
                <FollowingList followings={following} />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
