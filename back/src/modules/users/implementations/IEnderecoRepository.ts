import { ICreateEnderecoDTO } from "../dtos/ICreateEnderecoDTO"

interface IEnderecoRepository{
    create(data:ICreateEnderecoDTO):Promise<void>
}

export {IEnderecoRepository}