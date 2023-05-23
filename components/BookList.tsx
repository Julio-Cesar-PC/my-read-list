function BookList({ books }: any) {
    return (
        
        <div className="flex flex-wrap gap-2 justify-center mt-5">
        {books.map( (book: any) => (
            <div key={book.id} className="max-w-sm w-full lg:flex border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400">
            <div className="h-32 lg:h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                <img className="h-full" src={book.volumeInfo.imageLinks?.thumbnail || "user-profile-placeholder.jpg" } alt="capa do livro" />
            </div>
            <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">{book.volumeInfo.title}</div>
                <p className="text-gray-700 text-base">Numero de páginas: {book.volumeInfo.pageCount}</p>
                <p className="text-gray-700 text-base">Ano de publicação: {book.volumeInfo.publishedDate}</p>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">{book.volumeInfo.authors}</p>
                  <p className="text-gray-600">{book.volumeInfo.publisher}</p>
                </div>
              </div>
            </div>
          </div>
        )
        )}
        </div>
    )
}

export default BookList