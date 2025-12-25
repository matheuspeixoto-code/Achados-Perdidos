import { IObjetosImageRepository } from "@modules/objetos/implementations/IObjetosImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    objeto_id:string;
    objeto_image:string[];
}


@injectable()
class UploadObjetosImagesUseCase{
    constructor(
        @inject("ObjetosImagesRepository")
        private objetosImageRepository:IObjetosImageRepository
        
    ){}
    async execute({objeto_id,objeto_image}:IRequest){

        objeto_image.map(async (image)=>{
            await this.objetosImageRepository.create(objeto_id,image)
        })
        
    }
}
export {UploadObjetosImagesUseCase}