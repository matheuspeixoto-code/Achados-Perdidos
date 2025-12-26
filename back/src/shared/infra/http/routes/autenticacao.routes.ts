import { AutenticacaoUserController } from "@modules/users/useCases/autenticacaoUser/AutenticacaoUserController";
import { Router } from "express";


const autenticacaoRouter = Router()
const autenticacaoUserController = new AutenticacaoUserController()

autenticacaoRouter.post("/secao",autenticacaoUserController.handle)

export {autenticacaoRouter}