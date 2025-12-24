import { ICreateCategoriaDTO } from "../dtos/ICreatecategoriaDTO";
import { Categoria } from "../infra/typeorm/entities/Categoria"


interface ICategoriaRepository{
    findByName(nome:string):Promise<Categoria>;
    list():Promise<Categoria[]>;
    create({nome}:ICreateCategoriaDTO):Promise<void>;
}


export {ICategoriaRepository}