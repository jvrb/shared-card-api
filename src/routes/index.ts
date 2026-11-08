import { Router } from "express";
import { usersRoutes } from "./users-routes";

const routes = Router() // Criando nossa grupos de rotas

routes.use("/users", usersRoutes) // Rota de users

export { routes }