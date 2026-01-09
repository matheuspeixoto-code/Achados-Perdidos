import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { AppError } from "@shared/infra/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest{
    email:string;
    senha:string;
}

interface IResponse{
    user: {
        id: string;
        nome_completo: string;
        email: string;
        avatar?: string;
    };
    token:string;
}

@injectable()
class AutenticacaoUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory
    ){}

    async execute({email,senha}:IRequest):Promise<IResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user || user.deletedAt){
            throw new AppError("Email ou senha incorreta")
        }

        const senhaMatch = await compare(senha,user.senha)

        if(!senhaMatch){
            throw new AppError("Email ou senha incorreta")
        }

        const token = sign({},process.env.JWT_SECRET,{
            subject:user.id,
            expiresIn:"1d"
        })

        const tokenReturn:IResponse = {
            token,
            user: {
                id: user.id,
                nome_completo: user.nome_completo,
                email: user.email,
                avatar: user.avatar,
            },
        }

        return tokenReturn
    }
}

export {AutenticacaoUserUseCase}