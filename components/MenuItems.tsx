function MenuItems({ booksList }: any) {
  
  return (
    booksList.map((book: any) => (
    <tr className="text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
        <img className="h-20 p-2" src={book.Livros.imageLink || "book-placeholder.jpg"} alt="capa do livro" />
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
        <a href="#" className="font-medium text-primary dark:text-primary hover:underline">Editar</a>
      </td>
    </tr>
    )))
}

export default MenuItems