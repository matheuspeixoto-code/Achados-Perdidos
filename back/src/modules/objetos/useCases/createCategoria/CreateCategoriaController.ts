import { Request,Response } from "express"
import { container } from "tsyringe"
import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase"

class CreateCategoriaController{
    async handle(resquest:Request,response:Response):Promise<Response>{
        const {nome} = resquest.body

        const createCategoriaUseCase=container.resolve(CreateCategoriaUseCase)

        await createCategoriaUseCase.execute({nome})

        return response.status(201).send()

    }
}

export {CreateCategoriaController}