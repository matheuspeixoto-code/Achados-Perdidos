import { Router } from "express";

import { objetosRouter } from "./objetos.routes";

const router = Router()

router.use("/createObjetos", objetosRouter)

export {router}