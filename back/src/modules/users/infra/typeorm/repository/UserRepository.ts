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
    async deleteUser(user:User): Promise<void> {
        await this.repository.softDelete(user.id);
    }
    async save(user: User): Promise<User> {
        return await this.repository.save(user)
    }

    async create({
        cpf,
        data_nascimento,
        email,
        senha,
        genero,
        telefone,
        nome_completo,
        username,
    }: ICreateUserDTO): Promise<User> {


        const existingUser = await this.repository.findOne({
            where: { email },
            withDeleted: true,
        });


        if (existingUser && !existingUser.deletedAt) {
            throw new Error("Email já cadastrado");
        }


        if (existingUser && existingUser.deletedAt) {
            existingUser.deletedAt = null;
            existingUser.cpf = cpf;
            existingUser.data_nascimento = data_nascimento;
            existingUser.senha = senha; 
            existingUser.genero = genero;
            existingUser.telefone = telefone;
            existingUser.nome_completo = nome_completo;
            existingUser.username = username;

            return await this.repository.save(existingUser);
        }


        const user = this.repository.create({
            cpf,
            data_nascimento,
            email,
            senha,
            genero,
            telefone,
            nome_completo,
            username,
        });

        await this.repository.save(user);

        return user;
    }


    async findByEmail(email: string): Promise<User>{
        const user = await this.repository.findOne({where:{email}});
        return user;  
    }

    async findById(id:string):Promise<User>{
        const user = await this.repository.findOne({where:{id},
            relations: ["enderecos"]
        })
        return user
    }

}

export {UserRepository}