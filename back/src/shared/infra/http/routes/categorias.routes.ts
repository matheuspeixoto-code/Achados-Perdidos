import { CreateCategoriaController } from "@modules/objetos/useCases/createCategoria/CreateCategoriaController";
import { Router } from "express";

const categoriaRouter = Router()

const createCategoriaController = new CreateCategoriaController()

categoriaRouter.post("/",createCategoriaController.handle)
categoriaRouter.get("/")


export {categoriaRouter}