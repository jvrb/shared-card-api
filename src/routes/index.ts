import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { cardRoutes } from "./card-routes";

const routes = Router() // Criando nossa grupos de rotas

routes.use("/users", usersRoutes) // Rota de users
routes.use("/card", cardRoutes)

export { routes }