import { ICreateEnderecoDTO } from "@modules/users/dtos/ICreateEnderecoDTO";
import { IEnderecoRepository } from "@modules/users/implementations/IEnderecoRepository";
import { Repository } from "typeorm";
import { Endereco } from "../entities/Endereco";
import { AppDataSource } from "@data";


class EnderecoRepository implements IEnderecoRepository{
    private repository:Repository<Endereco>

    constructor(){
        this.repository=AppDataSource.getRepository(Endereco)
    }
    async findByUserId(user_id: string): Promise<Endereco> {
        return await this.repository.findOne({where:{user_id}})
    }
    async save(endereco: Endereco): Promise<void> {
        await this.repository.save(endereco)
    }


    async create({user_id,rua,cep,numero,bairro}: ICreateEnderecoDTO): Promise<void> {
        const endereco = this.repository.create({
            user_id,
            bairro,
            rua,
            cep,
            numero
        })

        await this.repository.save(endereco)
    }

}

export {EnderecoRepository}