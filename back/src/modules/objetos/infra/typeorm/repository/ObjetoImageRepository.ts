
import { Repository } from "typeorm";
import { AppDataSource } from "@data";
import { ObjetosImage } from "../entities/ObjetosImage";
import { IObjetosImageRepository } from "@modules/objetos/implementations/IObjetosImageRepository";


class ObjetosImagesRepository implements IObjetosImageRepository{
    private repository:Repository<ObjetosImage>

    constructor(){
        this.repository=AppDataSource.getRepository(ObjetosImage)
    }
    async create(objeto_id: string, objeto_image: string): Promise<ObjetosImage> {
        const objeto = this.repository.create({
            objeto:{id:objeto_id},
            objeto_image
        })

        await this.repository.save(objeto)

        return objeto
    }

    


}

export {ObjetosImagesRepository}