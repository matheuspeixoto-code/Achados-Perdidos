import { Router } from "express";

import { objetosRouter } from "./objetos.routes";
import { categoriaRouter } from "./categorias.routes";
import { userRouter } from "./user.routes";
import { autenticacaoRouter } from "./autenticacao.routes";
import { solicitacoesRoutes } from "./solicitacao.routes";


const router = Router()

router.use("/Objetos", objetosRouter)
router.use("/Categoria", categoriaRouter)
router.use("/User",userRouter)
router.use(autenticacaoRouter)
router.use("/Solicitacoes",solicitacoesRoutes)

export {router}