import { CardController } from "@/controllers/card-controllers";
import { Router } from "express";

const cardRoutes = Router()
const cardController = new CardController()

cardRoutes.post("/", cardController.create)

export { cardRoutes }