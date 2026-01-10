import { ICreateEnderecoDTO } from "../dtos/ICreateEnderecoDTO"
import { IUpdateEndereco } from "../dtos/IUpdateEndereco"
import { Endereco } from "../infra/typeorm/entities/Endereco"

interface IEnderecoRepository{
    create(data:ICreateEnderecoDTO):Promise<void>
    findByUserId(user_id:string):Promise<Endereco>
    save(endereco:IUpdateEndereco):Promise<void>
}

export {IEnderecoRepository}