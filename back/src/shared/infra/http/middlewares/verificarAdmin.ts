import { AppError } from "@shared/infra/errors/AppError";
import { UserRepository } from "@modules/users/infra/typeorm/repository/UserRepository";
import { Request,Response,NextFunction } from "express"

export async function verificarAdmin(
    request:Request,
    response:Response,
    next:NextFunction

){
    const {id}= request.user;

    const userRepository= new UserRepository()

    const user = await userRepository.findById(id)

    if (!user || !user.isAdmin) {
    throw new AppError("User isn't admin!", 403)
    }


    return next()
}
    
