import { CreateObjetosController } from "@modules/objetos/useCases/createObjetos/CreateObjetosController";
import { Router } from "express";

const objetosRouter = Router()

const createObjetosController = new CreateObjetosController()

objetosRouter.post("/",createObjetosController.handle)


export {objetosRouter}