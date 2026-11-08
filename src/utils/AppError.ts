// Classe de AppError contendo a mensage de error e o código
class AppError {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number) {
        this.message = message
        this.statusCode = statusCode
    }
}

export { AppError }