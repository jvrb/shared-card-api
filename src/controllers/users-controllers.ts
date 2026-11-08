import { Request, Response } from "express"
import z from "zod"
import { prisma } from "@/prisma"
import { hashPassword, verifyPassword } from "@/services/crypto"
import { AppError } from "@/utils/AppError"

// Criando a classe de controler do usuario
class UsersController {

    // metodo utilizado para criar um novo usuario (post)
    async create(request: Request, response: Response) {
        const userZod = z.object({
            name: z.string().trim().min(6),
            email: z.string().trim().email(),
            password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres")
        })

        const { name, email, password } = userZod.parse(request.body)

        const userExists = await prisma.user.findUnique({ where: { email } })
        if (userExists) {
            throw new AppError("Este email já está em uso!", 400)
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return response.status(201).json({
            message: "ok",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    }

    async index(request: Request, response: Response) {
        const users = await prisma.user.findMany()

        return response.json(users)
    }

    async login(request: Request, response: Response) {
        console.log(request.body)

        const userZod = z.object({
            email: z.string().trim().email(),
            password: z.string()
        })
        const { email, password } = userZod.parse(request.body)
        

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
      
        if (!userExists) {
            throw new AppError("Este usuario não existe", 401)
        }

        const comparePassword = await verifyPassword(userExists.password, password)

        if (comparePassword == false) {
            throw new AppError("Email e/ ou senha incorretos", 400)
        }

        return response.status(200).json({
            message: "Usuario identificado com sucesso"
        })

    }

    async update(request: Request, response: Response){

        const { id } = request.params

        const userZod = z.object({
            name: z.string().trim().min(6),
            email: z.string().trim().email(),
        })

        const { name, email } = userZod.parse(request.body)

        const updateUser = await prisma.user.update({
            where: {
                id: id.toString()
            },
            data: {
                name, email
            }
        })

        if(!updateUser) {
            throw new AppError("Não foi possivel atualizar o usuario", 400)
        }

        return response.status(201).json({message: "Usario atualizado com sucesso", updateUser})
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params

        const userDelete = await prisma.user.delete({
            where: {
                id: id.toString()
            }
        })

        if(!userDelete){
            throw new AppError("Não foi possivel deletar esse usuario, tente novamente", 400)
        }

        return response.status(201).json({message: "Usuario deletado com sucesso!"})
    }
}

export { UsersController }