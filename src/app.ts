import "express-async-errors"
import express from "express"

// Importando o middleware de definição de erro
import { errorHandling } from "./middlewares/error-handling"
import { routes } from "./routes"

const app = express() // Instanciando o express

app.use(express.json()) // Definindo o json como padrão de resposta do servidor
app.use(routes) // Utilizando nosso aglomerado de rotas
app.use(errorHandling) // Usando o middleware de erro


export { app }