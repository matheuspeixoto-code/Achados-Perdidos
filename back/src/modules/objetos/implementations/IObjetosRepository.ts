import { ObjetoStatus } from "../enum/ObjetoStatus";
import { Objetos } from "../infra/typeorm/entities/Objetos"
import { ICreateObjetosDTO } from "@modules/objetos/dtos/ICreateObjetosDTO"


interface IObjetosRepository{
    create({nome,descricao,dataEncontrada,local,categoria_id}:ICreateObjetosDTO):Promise<Objetos>
    list(categoria_id?:string,nome?:string):Promise<Objetos[]>;
    findById(id:string):Promise<Objetos>;
    update(objeto:Objetos):Promise<Objetos>
    updateStatus(objeto:Objetos,status:ObjetoStatus):Promise<void>
}

export {IObjetosRepository}