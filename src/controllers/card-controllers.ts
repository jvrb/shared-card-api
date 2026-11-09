import { prisma } from "@/prisma"
import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import z from "zod"

class CardController {
    async create(request: Request, response: Response ) {

        const cardZod = z.object({
            name: z.string().trim(),
            finalNumberCard: z.string().trim().min(4, "Informe os ultimos 4 numeros do cartão").max(4),
            flag: z.string().trim().min(4),
            color: z.string().trim(),
            owner: z.string().trim(),
            userId: z.string()
        })

        const { name, finalNumberCard, flag, color, owner, userId } = cardZod.parse(request.body)

        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!userExists){
            throw new AppError("Usuario não foi encontrado", 400)
        }

        const cardExists = await prisma.card.findUnique({
            where: {
                finalNumberCard
            }
        })

        if(cardExists){
            throw new AppError("Cartão já cadastrado!", 401)
        }

        const newCard = await prisma.card.create({
            data: {
                name,
                finalNumberCard,
                flag,
                color,
                owner,
                userId: userExists.id
            }
        })

        return response.status(201).json({
            message: "Cartão cadastrado com sucesso",
            card: {
                newCard
            }
        })
    }
}

export { CardController }