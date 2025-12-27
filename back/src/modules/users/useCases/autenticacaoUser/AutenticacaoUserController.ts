import { Request,Response } from "express"
import { container } from "tsyringe";
import { AutenticacaoUserUseCase } from "./AutenticacaoUserUseCase";


class AutenticacaoUserController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {email,senha} = request.body;

        const autenticacaoUserUseCase = container.resolve(AutenticacaoUserUseCase)

        const token = await autenticacaoUserUseCase.execute({email,senha})

        return response.json(token)
    }
}

export {AutenticacaoUserController}