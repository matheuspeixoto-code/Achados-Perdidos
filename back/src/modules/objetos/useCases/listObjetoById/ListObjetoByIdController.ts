import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListObjetosByIdUseCase } from "./ListObjetoByIdUseCase"


class ListObjetosByIdController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params
        const listObjetosByIdUseCase = container.resolve(ListObjetosByIdUseCase)

        const allObjetos = await listObjetosByIdUseCase.execute({
            id
        })

        return response.status(201).json(allObjetos)
    }
}

export {ListObjetosByIdController}