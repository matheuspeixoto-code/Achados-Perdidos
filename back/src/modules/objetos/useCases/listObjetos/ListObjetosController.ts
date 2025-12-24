import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListObjetosUseCase } from "./ListObjetosUseCase"

class ListObjetosController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {categoria_id,nome} = request.query
        const listObjetosUseCase = container.resolve(ListObjetosUseCase)

        const allObjetos = await listObjetosUseCase.execute({
            categoria_id: categoria_id as string,
            nome:nome as string
        })

        return response.status(201).json(allObjetos)
    }
}

export {ListObjetosController}