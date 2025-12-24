import { CreateObjetosController } from "@modules/objetos/useCases/createObjetos/CreateObjetosController";
import { ListObjetosController } from "@modules/objetos/useCases/listObjetos/ListObjetosController";
import { Router } from "express";

const objetosRouter = Router()

const createObjetosController = new CreateObjetosController()
const listObjetosController = new ListObjetosController()

objetosRouter.post("/",createObjetosController.handle)
objetosRouter.get("/",listObjetosController.handle)


export {objetosRouter}