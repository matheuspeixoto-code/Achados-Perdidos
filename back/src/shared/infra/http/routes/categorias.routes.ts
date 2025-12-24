import { CreateCategoriaController } from "@modules/objetos/useCases/createCategoria/CreateCategoriaController";
import { ListCategoriaController } from "@modules/objetos/useCases/listCategoria/ListCategoriaController";
import { Router } from "express";

const categoriaRouter = Router()

const createCategoriaController = new CreateCategoriaController()
const listCategoriaController = new ListCategoriaController()

categoriaRouter.post("/",createCategoriaController.handle)
categoriaRouter.get("/",listCategoriaController.handle)


export {categoriaRouter}