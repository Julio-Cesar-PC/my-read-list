import { PrismaClient } from '@prisma/client'

interface Livro {
    nome: string
    autor: string
    editora: string
    ano: number
    paginas: number
}

function createLivro (livro: Livro) {
  const prisma = new PrismaClient()
  const result = prisma.livros.create({
    data: {
      titulo: livro.nome,
      autor: livro.autor,
      editora: livro.editora,
      ano: livro.ano,
      paginas: livro.paginas
    }
  })
  prisma.$disconnect()
  return result
}

export { createLivro }