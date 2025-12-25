
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
        const carImage = this.repository.create({
            objeto_id,
            objeto_image
        })

        await this.repository.save(carImage)

        return carImage
    }

    


}

export {ObjetosImagesRepository}