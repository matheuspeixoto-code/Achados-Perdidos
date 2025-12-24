import { Objetos } from "../infra/typeorm/entities/Objetos"
import { ICreateObjetosDTO } from "@modules/objetos/dtos/ICreateObjetosDTO"


interface IObjetosRepository{
    create(data:ICreateObjetosDTO):Promise<Objetos>
    list():Promise<Objetos[]>
}

export {IObjetosRepository}