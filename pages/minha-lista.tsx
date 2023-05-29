import Layout from "../components/layout"
import MenuItems from "../components/MenuItems"
import { useState } from "react"

export default function IndexPage() {
  const [books, setBooks] = useState([]);

  return (
    <Layout>
      <div className="flex flex-col  min-h-screen py-2"> 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
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
            <MenuItems books={books}/>
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  )
}
