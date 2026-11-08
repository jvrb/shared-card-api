import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction} from "express"
import { ZodError } from "zod"

// Esse middleware é para definir de onde o erro está sendo lançado
export function errorHandling(error: any, request: Request, response: Response, next: NextFunction){
    // -> AppError: é um erro lançado pela gente
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({message: error.message})
    }

    // -> ZodError: é um erro de validação de dados
    if(error instanceof ZodError) {
        console.log(error)
        return response.status(500).json({
            message: "validation error",
            issues: error.format()
        })
    }

    // -> Caso o erro não seja lançado pela gente ou o erro não sejá de verificação do zod, temos o retorno padrão com status 500
    return response.status(500).json({message: error.message})
}
