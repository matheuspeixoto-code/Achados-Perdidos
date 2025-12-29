import { Request,Response } from "express"
import { GetUserByIdUseCase } from "./GetUserByIdUseCase"
import { container } from "tsyringe"

class GetUserByIdController{
    async handle(req:Request,res:Response):Promise<Response>{
        const id = req.user.id

        const getUserByIdUseCase= container.resolve(GetUserByIdUseCase)

        const user=await getUserByIdUseCase.execute(id)

        return res.status(201).json(user)
    }
}

export{GetUserByIdController}