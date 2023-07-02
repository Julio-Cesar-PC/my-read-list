import Layout from "../components/layout"
import BookList from "../components/BookList"
import React, { useState } from "react"
import axios from "axios"

export default function IndexPage() {
  const [books, setBooks] = useState([])
  

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let req = `https://www.googleapis.com/books/v1/volumes?q=${(document.getElementById('search') as HTMLInputElement).value}}`
    axios.get(req)
    .then(response => {
      setBooks(response.data.items)
    })
  }

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen py-2 mt-2">
        <form className="flex flex-col items-center w-full flex-1 px-20 text-center" onSubmit={handleSearch}>
          <label className="text-2xl">Pesquise por titulos</label>
          <div className="mt-2 flex gap-2 w-full">
            <input id="search" className="border-gray-300 border-2 rounded-md w-full" placeholder="Pesquise por titulos ou autores..."></input>
            <button className="bg-primary text-white p-2 rounded-md hover:bg-primaryLight" type="submit">Pesquisar</button>
          </div>
        </form>
        <BookList books={books} />
      </div>
    </Layout>
  )
}
