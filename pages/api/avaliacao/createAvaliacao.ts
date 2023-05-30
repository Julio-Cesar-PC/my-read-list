import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient()
        console.log(req.body)
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
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}