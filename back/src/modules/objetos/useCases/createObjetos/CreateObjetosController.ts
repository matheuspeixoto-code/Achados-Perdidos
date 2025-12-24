import { container } from "tsyringe"
import { Request,Response } from "express"
import { CreateObjetosUseCase } from "./CreateObjetosUseCase"

class CreateObjetosController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {nome,descricao,local,dataEncontrada} = request.body

        const createObjetosUseCase = container.resolve(CreateObjetosUseCase)

        const objeto =await createObjetosUseCase.execute({
            nome,descricao,local,dataEncontrada
        })

        return response.status(201).json(objeto)
    }
}


export {CreateObjetosController}