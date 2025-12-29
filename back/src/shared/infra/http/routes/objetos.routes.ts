import { CreateObjetosController } from "@modules/objetos/useCases/createObjetos/CreateObjetosController";
import { ListObjetosController } from "@modules/objetos/useCases/listObjetos/ListObjetosController";
import { ListObjetosByIdController } from "@modules/objetos/useCases/listObjetoById/ListObjetoByIdController";
import { UploadObjetoImageController } from "@modules/objetos/useCases/uploadObjetoImage/UploadObjetoImageController";
import multer from "multer";
import { Router } from "express";

import uploadConfig from "@config/upload";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { UpdateObjetosController } from "@modules/objetos/useCases/updateObjeto/UpdateObjetoController";
const objetosRouter = Router()

const upload= multer(uploadConfig.upload("./tmp/objetos"))

const createObjetosController = new CreateObjetosController()
const listObjetosController = new ListObjetosController()
const listObjetosByIdController = new ListObjetosByIdController ()
const uploadObjetoImageController = new UploadObjetoImageController()
const updateObjetoController = new UpdateObjetosController()

objetosRouter.post("/",
    verificarAutentificacao,
    verificarAdmin,
    createObjetosController.handle
)

objetosRouter.put("/:id",
    verificarAutentificacao,
    verificarAdmin,
    updateObjetoController.handle
)

objetosRouter.get("/",listObjetosController.handle)
objetosRouter.get("/:id",listObjetosByIdController.handle)

objetosRouter.post("/images/:id",
    verificarAutentificacao,
    verificarAdmin,
    upload.array("images"),
    uploadObjetoImageController.handle

)

export {objetosRouter}