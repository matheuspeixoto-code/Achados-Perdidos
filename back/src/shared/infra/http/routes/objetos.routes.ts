import { CreateObjetosController } from "@modules/objetos/useCases/createObjetos/CreateObjetosController";
import { ListObjetosController } from "@modules/objetos/useCases/listObjetos/ListObjetosController";
import { ListObjetosByIdController } from "@modules/objetos/useCases/listObjetoById/ListObjetoByIdController";
import { Router } from "express";

const objetosRouter = Router()

const createObjetosController = new CreateObjetosController()
const listObjetosController = new ListObjetosController()
const listObjetosByIdController = new ListObjetosByIdController ()

objetosRouter.post("/",createObjetosController.handle)
objetosRouter.get("/",listObjetosController.handle)
objetosRouter.get("/:id",listObjetosByIdController.handle)

export {objetosRouter}