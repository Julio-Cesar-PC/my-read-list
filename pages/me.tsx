import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MePage() {
  const { data: session, status } = useSession();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [lastAvaliacao, setLastAvaliacao] = useState({});

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
  }

  useEffect(() => {
    getFollowers();
    getFollowing();
    getLastAvaliacao();
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
          </div>
        </div>
        <div className="mb-4 ml-11 flex gap-5">
          <h1 className="mb-2"> livros avaliados</h1>
          <h1 className="mb-2">{followers.length} seguidores</h1>
          <div className="flex gap-4">
            <FollowersList followers={followers} />
          </div>
          <h1 className="mb-2">{following.length} seguindo</h1>
          <div className="flex gap-4">
            <FollowingList followings={following} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
