import { Request,Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUsersUseCase";



class CreateUserController{
    async handle(resquest:Request, response:Response) :Promise<Response>{
        const {
            cpf,
            telefone,
            username,
            nome_completo,
            email, 
            senha,
            genero,
            data_nascimento,
            endereco
        } = resquest.body
        const createUserUseCase= container.resolve(CreateUserUseCase)

        const user = await createUserUseCase.execute({
            cpf,
            telefone,
            username,
            nome_completo,
            email, 
            senha,
            genero,
            data_nascimento,
            endereco
        })

        return response.status(201).json(user)
    }
}

export {CreateUserController}