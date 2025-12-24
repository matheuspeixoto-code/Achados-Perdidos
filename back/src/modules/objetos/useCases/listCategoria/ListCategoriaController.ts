import { Request,Response } from "express"
import { container } from "tsyringe"
import { ListCategoriaUseCase } from "./ListCategoriaUseCase"

class ListCategoriaController{
    async handle(resques:Request,response:Response):Promise<Response> {
        const listCategoriaRepository = container.resolve(ListCategoriaUseCase)

        const allCategorias = await listCategoriaRepository.execute()

        return response.status(201).json(allCategorias)
    }
}

export {ListCategoriaController}