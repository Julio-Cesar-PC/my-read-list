import Layout from "../components/layout"
import MenuItems from "../components/MenuItems"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const [booksList, setBooksList] = useState([]);
  const { data: session } = useSession();

  useEffect(()=>{
    let req = `http://localhost:3000/api/auth/getUserByEmail`
    axios.get(req, { params: { email: session?.user?.email }})
    .then(response => {
      let userId = response.data.id
      axios.get("http://localhost:3000/api/avaliacao/getAllAvaliacaoByUserId", { params: { userId: userId }})
      .then(response => {
        setBooksList(response.data)
      })
    })
  },[session])

  return (
    <Layout>
      <div className="flex flex-col  min-h-screen py-2"> 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Editar</span>
                  </th>
              </tr>
            </thead>
          <tbody>
            <MenuItems booksList={booksList}/>
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  )
}
