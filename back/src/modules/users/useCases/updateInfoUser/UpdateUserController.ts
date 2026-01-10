import { Response,Request } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


class UpdateUserController{
    async handle(request:Request,response:Response):Promise<Response>{
        const data= request.body


        const id = request.user.id

        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        const user = await updateUserUseCase.execute(
            id,
            data
        )

        return response.status(200).json(user);
    }
    
}


export {UpdateUserController}