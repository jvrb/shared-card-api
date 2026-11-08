import { AppError } from "@/utils/AppError"
import argon2 from "argon2"

async function hashPassword(textPassword: string): Promise<string>{
    try {
        const hashedPassword = await argon2.hash(textPassword)
        return hashedPassword
    } catch (error) {
        throw new AppError("Erro ao gerar hash da senha", 500)
    }
}

async function verifyPassword(hashPassword: string, textPassword: string): Promise<boolean>{
    try {
        const match = await argon2.verify(hashPassword, textPassword)

        return match
    } catch (error) {
        throw new AppError("Erro ao verificar a senha", 500)
    }
}
export { hashPassword , verifyPassword}