import { ObjetosImage } from "../infra/typeorm/entities/ObjetosImage"


interface IObjetosImageRepository{
    create(objeto_id:string,objeto_image:string): Promise<ObjetosImage>
}

export {IObjetosImageRepository}