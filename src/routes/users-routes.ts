import { Router } from "express";
import { UsersController } from "@/controllers/users-controllers";


// Criando um agrupador de rotas individual para os usuarios (agrupador modular)
const usersRoutes = Router()

// Criando uma instancia do controller do usuario
const usersController = new UsersController()

// Definindo qual metodo do controller irá tratar a requisição post 
usersRoutes.post("/", usersController.create)
usersRoutes.post("/login", usersController.login)
usersRoutes.put("/updateUser/:id", usersController.update)
usersRoutes.delete("/deleteUser/:id", usersController.delete)
usersRoutes.get("/", usersController.index)

export { usersRoutes }