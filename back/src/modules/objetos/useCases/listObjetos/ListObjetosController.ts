import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListObjetosUseCase } from "./ListObjetosUseCase"

class ListObjetosController{
    async handle(request:Request,response:Response):Promise<Response>{
        const listObjetosUseCase = container.resolve(ListObjetosUseCase)

        const allObjetos = await listObjetosUseCase.execute()

        return response.status(201).json(allObjetos)
    }
}

export {ListObjetosController}