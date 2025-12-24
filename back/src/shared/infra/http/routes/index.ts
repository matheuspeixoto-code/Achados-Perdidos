import { Router } from "express";

import { objetosRouter } from "./objetos.routes";
import { categoriaRouter } from "./categorias.routes";

const router = Router()

router.use("/Objetos", objetosRouter)
router.use("/Categoria", categoriaRouter)

export {router}