import { Request,Response } from "express"
import { container } from "tsyringe"
import { UploadObjetosImagesUseCase } from "./UploadObjetoImageUseCase";


interface IFiles{
    filename:string;
}

class UploadObjetoImageController{

    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params
        const images = request.files as IFiles[]

        const uploadCarImagesUseCase = container.resolve(UploadObjetosImagesUseCase)
        const objeto_image = images.map((file) => file.filename)

        await uploadCarImagesUseCase.execute({
            objeto_id:id,
            objeto_image
        })

        return response.status(201).send()
    }

}

export {UploadObjetoImageController}
