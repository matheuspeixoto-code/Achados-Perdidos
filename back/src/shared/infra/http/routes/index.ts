import { Router } from "express";

import { objetosRouter } from "./objetos.routes";
import { categoriaRouter } from "./categorias.routes";
import { userRouter } from "./user.routes";


const router = Router()

router.use("/Objetos", objetosRouter)
router.use("/Categoria", categoriaRouter)
router.use("/User",userRouter)

export {router}