import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "@data";


class UserRepository implements IUserReposiory{
    private repository : Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    async create({cpf,data_nascimento,email,senha,genero,telefone,nome_completo,username}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            cpf,
            data_nascimento,
            email,
            senha,
            genero,
            telefone,
            nome_completo,
            username
        });

        await this.repository.save(user)

        return user
    }

    async findByEmail(email: string): Promise<User>{
        const user = await this.repository.findOne({where:{email}});
        return user;  
    }

    async findById(id:string):Promise<User>{
        const user = await this.repository.findOne({where:{id}})
        return user
    }

}

export {UserRepository}