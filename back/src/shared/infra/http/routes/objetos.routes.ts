import { CreateObjetosController } from "@modules/objetos/useCases/createObjetos/CreateObjetosController";
import { ListObjetosController } from "@modules/objetos/useCases/listObjetos/ListObjetosController";
import { ListObjetosByIdController } from "@modules/objetos/useCases/listObjetoById/ListObjetoByIdController";
import { UploadObjetoImageController } from "@modules/objetos/useCases/uploadObjetoImage/UploadObjetoImageController";
import multer from "multer";
import { Router } from "express";

import uploadConfig from "@config/upload";
const objetosRouter = Router()

const upload= multer(uploadConfig.upload("./tmp/objetos"))

const createObjetosController = new CreateObjetosController()
const listObjetosController = new ListObjetosController()
const listObjetosByIdController = new ListObjetosByIdController ()
const uploadObjetoImageController = new UploadObjetoImageController()

objetosRouter.post("/",createObjetosController.handle)
objetosRouter.get("/",listObjetosController.handle)
objetosRouter.get("/:id",listObjetosByIdController.handle)

objetosRouter.post("/images/:id",
    upload.array("images"),
    uploadObjetoImageController.handle

)

export {objetosRouter}