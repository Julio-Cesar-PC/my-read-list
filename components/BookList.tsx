import { Modal, Button, Rating } from "flowbite-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react";

function BookList({ books }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [bookModal, setBookModal] = useState({} as any)
  const [currentStars, setCurrentStars] = useState(0)
  const [stars, setStars] = useState()
  const [status, setStatus] = useState("")
  const [pages, setPages] = useState(0)
  const [btnAddList, setBtnAddList] = useState(false)
  const { data: session } = useSession();
  
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  function handleBookClick(book: any) {
    setBookModal(book)
    toggleModal()
  }

  async function verificaSeLivroExiste(book: any) {
    // verifica se o livro já existe no banco de dados
    let result = await axios.get("/api/livros/getLivroByGID", { params: { googleId: book.id }})
    if (result.data == null) {
      // console.log('livro não existe no banco de dados')
      // criar um objeto com as informações do livro e enviar para o backend
      let livro = {
        googleId: book.id,
        titulo: book.volumeInfo.title || "Não informado",
        autor: book.volumeInfo.authors[0] || "Não informado",
        editora: book.volumeInfo.publisher || "Não informado",
        dataPublicacao: book.volumeInfo.publishedDate || "2000-01-01",
        paginas: book.volumeInfo.pageCount || 0,
        imageLink: book.volumeInfo.imageLinks?.thumbnail || "book-placeholder.jpg",
        selfLink: book.selfLink,
      }      
      // enviar o objeto para o backend
      await axios.post("/api/livros/createLivro", livro)
    }
  }


  async function sendReview(book: any, e: any) {
    setBtnAddList(true)
    await verificaSeLivroExiste(book)
    
    // verifica se o usuário já avaliou o livro
    let nota = (document.getElementById('stars') as HTMLInputElement).value;
    let status = (document.getElementById('status') as HTMLInputElement).value;
    let paginasLidas = (document.getElementById('paginasLidas') as HTMLInputElement).value;

    axios.get("/api/auth/getUserByEmail", { params: { email:  session?.user?.email }})
    .then(async response => {
      let reviewBook = await axios.get("/api/livros/getLivroByGID", { params: { googleId: book.id }})
      let userId = response.data.id
      let avaliacao = {
        userId: userId,
        livroId: reviewBook.data.id,
        nota: Number(nota),
        status: status,
        paginasLidas: Number(paginasLidas)
      }
      axios.post("/api/avaliacao/createAvaliacao", avaliacao)
      .then(response => {
        setIsOpen(false)
        setBtnAddList(false)
      })

    })
  }

  
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-5">
      {books.map((book: any) => (
        <div key={book.id} onClick={() => handleBookClick(book)} className="transition ease-in-out delay-60 max-w-sm w-full lg:flex border border-gray-400 rounded hover:translate-y-1">
          <div className="h-32 lg:h-52 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img className="h-full p-2" src={book.volumeInfo.imageLinks?.thumbnail || "book-placeholder.jpg"} alt="capa do livro" />
          </div>
          <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className=" font-bold text-xl mb-2">{book.volumeInfo.title}</div>
                <p className=" text-base">Numero de páginas: {book.volumeInfo.pageCount}</p>
                <p className=" text-base">Data de publicação: {book.volumeInfo.publishedDate}</p>
              </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className=" leading-none">{book.volumeInfo.authors}</p>
                <p className="">{book.volumeInfo.publisher}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
        <Modal show={isOpen} onClose={toggleModal} className="p-10 m-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 p-2">
              <h1 className="text-2xl font-bold">{bookModal?.volumeInfo?.title}</h1>
              <p className="text-lg">{bookModal?.volumeInfo?.authors}</p>
            </div>
           <div className="flex flex-row gap-2">
            <img className="w-1/3 h-1/3 p-2" src={bookModal?.volumeInfo?.imageLinks?.thumbnail || "book-placeholder.jpg"} alt="capa do livro" />
            <div className="flex flex-col gap-2 w-2/3">
            <form>
              <label className="block mb-2 text-sm font-medium">Nota:</label>
              <select id="stars" className="select max-w-xs mt-4 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option disabled>Escolha a Nota</option>
                <option value="1">1 estrela</option>
                <option value="2">2 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="5">5 estrelas</option>
              </select>

              <label className="block mb-2 text-sm font-medium">Status:</label>
              <select  id="status" className="select max-w-xs mt-4borderb text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option disabled>Escolha o Status</option>
                <option value="Quero Ler">Quero Ler</option>
                <option value="Lendo">Lendo</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Abandonado">Abandonado</option>
              </select>
              
              <div className="max-w-xs mt-4">
                <label className="block mb-2 text-sm font-medium">Nº de paginas lidas:</label>
                <input 
                  type="number" 
                  max={bookModal?.volumeInfo?.pageCount}
                  id="paginasLidas" 
                  placeholder={"0/" + bookModal?.volumeInfo?.pageCount}
                  className="input block w-full p-2border border-gray-300 rounded-lg sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
              </div>
              <div className="flex justify-left p-2">
                <Button disabled={btnAddList} id="review-btn" onClick={(e) => sendReview(bookModal, e)} className="bg-primary hover:bg-gray-400">Adicionar a Minha Lista</Button>
              </div>
            </form>


            </div>
            </div>
           <div className="flex flex-row gap-2 p-3">
              <p className="text-lg text-justify">{bookModal?.volumeInfo?.description}</p>
            </div>
            <div className="flex justify-center p-2">
              <Button className="w-1/5 bg-primary hover:bg-gray-400" onClick={toggleModal}>Fechar</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
}

export default BookList