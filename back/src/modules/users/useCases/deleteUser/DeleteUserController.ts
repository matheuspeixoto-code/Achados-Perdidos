import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { container } from "tsyringe";


class DeleteUserController{
    async handle(request:Request,response:Response):Promise<Response>{
        const id = request.user.id

        const deleteUserUseCase = container.resolve(DeleteUserUseCase)

        await deleteUserUseCase.execute(id)

        return response.status(201).send()
    }
}

export {DeleteUserController}