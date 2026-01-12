import { Sexo } from "@modules/users/enum/Sexo";
import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";
import { validarCPF } from "@modules/users/validacao/ValidarCPF";
import { validarEmail } from "@modules/users/validacao/ValidarEmail";

import { hash } from "bcrypt";
import { IEnderecoRepository } from "@modules/users/implementations/IEnderecoRepository";

interface IRequest{
    cpf:string;
    telefone:string;
    username:string;
    nome_completo:string;
    email:string;
    senha:string;
    genero:Sexo;
    data_nascimento:Date,
    endereco:{
        user_id:string
        cep:string;
        rua:string;
        numero:string;
        bairro:string
    }
}


@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory,

        @inject("EnderecoRepository")
        private enderecoRepository:IEnderecoRepository

    ){}


    async execute({cpf,telefone,username,nome_completo,email,senha,genero,data_nascimento,endereco}:IRequest):Promise<User>{

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
            username,
        })

        await this.enderecoRepository.create({
            user_id:user.id,
            cep:endereco.cep,
            rua:endereco.rua,
            numero:endereco.numero,
            bairro:endereco.bairro
        })

        return user
    }
}

export {CreateUserUseCase}