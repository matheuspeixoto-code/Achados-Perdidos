import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modules/users/infra/typeorm/repository/UserRepository";
import { AppError } from "@shared/infra/errors/AppError";

interface IPayload{
    sub:string
}

export async function verificarAutentificacao(request:Request,response:Response,next:NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing",401)
    }

    const [,token]= authHeader.split(" ")

    try{
        const {sub :user_id} =verify(token,process.env.JWT_SECRET) as IPayload
        const userRepository = new UserRepository()
        const user = await userRepository.findById(user_id)

        
        if(!user){
            throw new AppError("Usuário não existente", 401)
        }

        request.user={
            id:user_id
        }

        next()

    }catch{
        throw new AppError("Invalid token",401)
    }
}