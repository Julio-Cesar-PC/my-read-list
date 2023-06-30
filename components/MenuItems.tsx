import React, { useState } from 'react'
import { Modal, Button } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";

function MenuItems({ booksList }: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [bookModal, setBookModal] = useState<any>();
  const [formData , setFormData] = useState({
    id: 0,
    nota: '',
    status: "",
    paginasLidas: 0,
  })
  const [id, setId] = useState(0)
  const [nota, setNota] = useState(0)
  const [status, setStatus] = useState("")
  const [paginasLidas, setPaginasLidas] = useState(0)
  const [btnSaveList, setbtnSaveList] = useState(false)

  function toggleModal(book: any) {
    setOpenModal(openModal === 'form-elements' ? undefined : 'form-elements');
    setBookModal(book);
    setFormData({ ...formData, id: book.id, nota: book.nota, status: book.status, paginasLidas: book.paginasLidas })
  }

  function handleSaveBtn(e: any, book: any) {
    e.preventDefault()
    // setbtnSaveList(true)
    console.log(book)

  }

  return (
    booksList.map((book: any) => (
      <tr key={book.id} className="text-leftborder-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
          <img className="h-20 p-2" src={book.Livros.imageLink} alt="capa do livro" />
        </th>
        <td className="px-6 py-4">
          {book.Livros.titulo}
        </td>
        <td className="px-6 py-4">
          {book.nota}
        </td>
        <td className="px-6 py-4">
          {book.status}
        </td>
        <td className="px-6 py-4">
          {book.paginasLidas} / {book.Livros.paginas}
        </td>
        <td className="px-6 py-4 text-right">
          <button className="mx-2 btn btn-warning" onClick={() => toggleModal(book)}><FaEdit /></button>
          <button className="btn btn-error"><FaTrash /></button>
          <Modal show={props.openModal === 'form-elements'} popup onClose={() => props.setOpenModal(undefined)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-2">
                <h1 className="text-2xl font-bold">{bookModal?.Livros?.titulo}</h1>
                <p className="text-lg">{bookModal?.Livros?.autor}</p>
              </div>
              <div className="flex flex-row gap-2">
                <img className="w-1/3 h-1/3 p-2" src={bookModal?.Livros?.imageLink || "book-placeholder.jpg"} alt="capa do livro" />
                <div className="flex flex-col gap-2 w-2/3">
                  <form>
                    <label className="block mb-2 text-sm font-medium">Nota:</label>
                    <select value={formData.nota}
                            id="stars"
                            className="select max-w-xs mt-4 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={(e) => setFormData({ ...formData, nota: Number(e.target.value)})}>
                      <option disabled>Escolha a Nota</option>
                      <option value="1">1 estrela</option>
                      <option value="2">2 estrelas</option>
                      <option value="3">3 estrelas</option>
                      <option value="4">4 estrelas</option>
                      <option value="5">5 estrelas</option>
                    </select>

                    <label className="block mb-2 text-sm font-medium">Status:</label>
                    <select value={formData.status} 
                            id="status" 
                            className="select max-w-xs mt-4borderb text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={(e) => setFormData({ ...formData, status: e.target.value})}>
                      <option disabled>Escolha o Status</option>
                      <option value="Quero Ler">Quero Ler</option>
                      <option value="Lendo">Lendo</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Abandonado">Abandonado</option>
                    </select>

                    <div className="max-w-xs mt-4">
                      <label className="block mb-2 text-sm font-medium">Nº de paginas lidas:</label>
                      <input
                        value={formData.paginasLidas}
                        type="text"
                        max={bookModal?.Livros?.paginas}
                        id="paginasLidas"
                        placeholder={"0/" + bookModal?.Livros?.paginas}
                        className="input block w-full p-2border border-gray-300 rounded-lg sm:text-xs focus:ring-blue-500 focus:border-blue-500 " 
                        onChange={(e) => {
                          e.preventDefault;
                          setFormData({ ...formData, paginasLidas: Number(e.target.value)})
                        }}/>
                    </div>
                    <div className="flex justify-left p-2">
                      <Button disabled={btnSaveList} onClick={(e) => handleSaveBtn(e, bookModal)} id="review-btn" className="bg-primary hover:bg-gray-400">Salvar</Button>
                    </div>
                  </form>


                </div>
              </div>
              <div className="flex justify-center p-2">
                <Button onClick={toggleModal} className="w-1/5 bg-primary hover:bg-gray-400">Fechar</Button>
              </div>
            </div>
          </Modal>
        </td>
      </tr>
    )))
}

export default MenuItems