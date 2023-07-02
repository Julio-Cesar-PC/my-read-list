import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
    const prisma = new PrismaClient()
    try {
        // verificando se o usuário já avaliou o livro
        const avaliacao = await prisma.livrosUser.findFirst({
            where: {
                userId: req.body.userId,
                livroId: req.body.livroId
            }
        })
        if (!avaliacao) {
            const result = await prisma.livrosUser.create({
                data: {
                    userId: req.body.userId,
                    livroId: req.body.livroId,
                    nota: req.body.nota,
                    status: req.body.status,
                    paginasLidas: req.body.paginasLidas,
                }
            })
            prisma.$disconnect()
            res.status(200).json({ message: 'Avaliação criada com sucesso!' })
        } else {
            prisma.$disconnect()
            res.status(302).json({ message: 'Você já avaliou esse livro!' })
        }
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}