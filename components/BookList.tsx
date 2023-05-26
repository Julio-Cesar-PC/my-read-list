import { Modal, Button } from "flowbite-react"
import { useState } from "react"

function BookList({ books }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [bookModal, setBookModal] = useState({} as any)
  
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  function handleBookClick(book: any) {
    setBookModal(book)
    toggleModal()
  }

  
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-5">
      {books.map((book: any) => (
        <div key={book.id} onClick={() => handleBookClick(book)} className="transition ease-in-out delay-60 max-w-sm w-full lg:flex border border-gray-400 rounded hover:translate-y-1">
          <div className="h-32 lg:h-52 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img className="h-full p-2" src={book.volumeInfo.imageLinks?.thumbnail || "book-placeholder.jpg"} alt="capa do livro" />
          </div>
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{book.volumeInfo.title}</div>
                <p className="text-gray-700 text-base">Numero de páginas: {book.volumeInfo.pageCount}</p>
                <p className="text-gray-700 text-base">Data de publicação: {book.volumeInfo.publishedDate}</p>
              </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{book.volumeInfo.authors}</p>
                <p className="text-gray-600">{book.volumeInfo.publisher}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
        <Modal show={isOpen} onClose={toggleModal}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 p-2">
              <h1 className="text-2xl font-bold">{bookModal?.volumeInfo?.title}</h1>
              <p className="text-lg">{bookModal?.volumeInfo?.authors}</p>
            </div>
           <div className="flex flex-row gap-2">
            <img className="w-1/3 h-1/3 p-2" src={bookModal?.volumeInfo?.imageLinks?.thumbnail || "book-placeholder.jpg"} alt="capa do livro" />
            <div className="flex flex-col gap-2 w-2/3">
            </div>
            </div>
           <div className="flex flex-row gap-2 p-3">
              <p className="text-lg text-justify">{bookModal?.volumeInfo?.description}</p>
            </div>
            <div className="flex justify-center p-2">
              <Button className="w-1/5 bg-gray-600 hover:bg-gray-400" onClick={toggleModal}>Fechar</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
}

export default BookList