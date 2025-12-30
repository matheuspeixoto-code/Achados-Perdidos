import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListObjetosSolicitadosByIdUseCase } from "./ListObjetosSolicitadosByIdUseCase";

class ListObjetosSolicitadosByIdController{
    async handle(req:Request,res:Response):Promise<Response>{

        const {id} = req.params

        const listObjetosSolicitadosByIdUseCase = container.resolve(ListObjetosSolicitadosByIdUseCase)

        const listSolicitadosById=await listObjetosSolicitadosByIdUseCase.execute(id);

        return res.status(200).json(listSolicitadosById)
    }
}

export{ListObjetosSolicitadosByIdController}