import { Sexo } from "@modules/users/enum/Sexo";
import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";
import { validarCPF } from "@modules/users/validação/ValidarCPF";
import { validarEmail } from "@modules/users/validação/ValidarEmail";

import { hash } from "bcrypt";

interface IRequest{
    cpf:string;
    telefone:string;
    username:string;
    nome_completo:string;
    email:string;
    senha:string;
    genero:Sexo;
    data_nascimento:Date
}


@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory

    ){}


    async execute({cpf,telefone,username,nome_completo,email,senha,genero,data_nascimento}:IRequest):Promise<User>{

        if(!validarCPF(cpf)){
            throw new AppError("CPF inválido")
        }
        if(!validarEmail(email)){
            throw new AppError("Email inválido")
        }
        if (!Object.values(Sexo).includes(genero)) {
            throw new AppError("Gênero inválido"); 
        }

        const userExistente = await this.userRepository.findByEmail(email)

        if(userExistente){
            throw new AppError("Usuário já existente")
        }

        const senhaHash = await hash(senha,8)

        const user = await this.userRepository.create({
            cpf,
            data_nascimento,
            email,
            senha:senhaHash ,
            genero,
            telefone,
            nome_completo,
            username
        })

        return user
    }
}

export {CreateUserUseCase}