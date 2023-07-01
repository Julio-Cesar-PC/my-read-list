import React, { useState } from 'react'
import { Modal, Button } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function MenuItems({ booksList }: any) {
  const [openModalEdit, setOpenModalEdit] = useState<string | undefined>();
  const [openModalDelete, setOpenModalDelete] = useState<string | undefined>();
  const props = { openModalEdit, setOpenModalEdit, openModalDelete, setOpenModalDelete };
  const [bookModal, setBookModal] = useState<any>();
  const [formData , setFormData] = useState({
    id: 0,
    nota: 0,
    status: "",
    paginasLidas: 0,
  })
  const [id, setId] = useState(0)
  const [nota, setNota] = useState(0)
  const [status, setStatus] = useState("")
  const [paginasLidas, setPaginasLidas] = useState(0)
  const [btnSaveList, setbtnSaveList] = useState(false)

  function toggleModalEdit(book: any) {
    setOpenModalEdit(openModalEdit === 'form-elements' ? undefined : 'form-elements');
    setBookModal(book);
    setFormData({ ...formData, id: book.id, nota: book.nota, status: book.status, paginasLidas: book.paginasLidas })
  }

  function toggleModalDelete(book: any) {
    setOpenModalDelete(openModalDelete === 'form-elements' ? undefined : 'form-elements');
    setBookModal(book);
  }

  function handleSaveBtn(e: any, book: any) {
    e.preventDefault()
    setbtnSaveList(true)
    axios.patch("/api/avaliacao/updateAvaliacao", formData)
    .then(response => {
      setbtnSaveList(false)
      toggleModalEdit(book)
      window.location.reload()
    })
    .catch(err => {
      alert("Erro ao atualizar a avaliação")
      setbtnSaveList(false)
      toggleModalEdit(book)
      window.location.reload()
    })
  }

  function handleDeleteBtn(book: any) {
    console.log(book.id)
    axios.delete("/api/avaliacao/deleteAvaliacaoById", { params: { id: book.id } })
    .then(response => {
      toggleModalDelete(book)
      window.location.reload()
    })
    .catch(err => {
      alert("Erro ao deletar a avaliação")
      toggleModalDelete(book)
      window.location.reload()
    })
    toggleModalDelete(book)
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
          <button className="mx-2 btn btn-warning" onClick={() => toggleModalEdit(book)}><FaEdit /></button>
          <button className="btn btn-error" onClick={() => toggleModalDelete(book)}><FaTrash /></button>
          <Modal show={props.openModalEdit === 'form-elements'} popup onClose={() => props.setOpenModalEdit(undefined)}>
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
                <Button onClick={toggleModalEdit} className="w-1/5 bg-primary hover:bg-gray-400">Fechar</Button>
              </div>
            </div>
          </Modal>

          <Modal show={props.openModalDelete === 'form-elements'} popup onClose={() => props.setOpenModalDelete(undefined)}>
            <Modal.Header>
              Deletar Livro {bookModal?.Livros?.titulo}
            </Modal.Header>
            <Modal.Body>
              <p>Tem certeza que deseja deletar o livro {bookModal?.Livros?.titulo}?</p>
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
              <button onClick={toggleModalDelete} className="btn">Cancelar</button>
              <button onClick={() => handleDeleteBtn(bookModal)} className="btn btn-error">Deletar</button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    )))
}

export default MenuItems