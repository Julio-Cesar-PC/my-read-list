import Layout from "../components/layout"
import BookList from "../components/BookList"
import { useSession } from "next-auth/react"
import { useState } from "react"
import axios from "axios"

export default function IndexPage() {
  const [books, setBooks] = useState([])
  const { data: session, status } = useSession()

  function handleSearch(e: any) {
    e.preventDefault()
    let req = `https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('search').value}}`
    axios.get(req)
    .then(response => {
      console.log(response.data)
      setBooks(response.data.items)
    })
    console.log("Pesquisando...")
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <form className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center" onSubmit={handleSearch}>
          <label className="text-2xl">Pesquise por titulos</label>
          <div className="flex gap-2 w-full">
            <input id="search" className="border-gray-300 border-2 rounded-md w-full" placeholder="Pesquise por titulos ou autores..."></input>
            <button className="bg-primary text-white p-2 rounded-md hover:bg-primaryLight" type="submit">Pesquisar</button>
          </div>
        </form>
        <BookList books={books} />
      </div>
    </Layout>
  )
}
