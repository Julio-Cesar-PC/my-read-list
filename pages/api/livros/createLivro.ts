import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient()
        console.log(req)
        const result = await prisma.livros.create({
            data: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                editora: req.body.editora,
                ano: req.body.ano,
                paginas: req.body.paginas
            }
        })
        prisma.$disconnect()
        console.log(result)
        res.status(200).json({ message: 'Livro criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}