import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.livros.create({
            data: {
                googleId: req.body.googleId,
                titulo: req.body.titulo,
                autor: req.body.autor,
                editora: req.body.editora,
                dataPublicacao: new Date(req.body.dataPublicacao),
                paginas: req.body.paginas,
                imageLink: req.body.imageLink,
                selfLink: req.body.selfLink,
            }
        })
        prisma.$disconnect()
        res.status(200).json({ message: 'Livro criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}