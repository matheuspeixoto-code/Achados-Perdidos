import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListObjetosSolicitadosUseCase } from "./ListObjetosSolicitadosUseCase"

class ListObjetosSolicitadosController{
    async handle(req:Request,res:Response):Promise<Response>{
        const listObjetosSolicitadosUseCase = container.resolve(ListObjetosSolicitadosUseCase)

        const listSolicitados=await listObjetosSolicitadosUseCase.execute();

        return res.status(200).json(listSolicitados)
    }
}

export{ListObjetosSolicitadosController}