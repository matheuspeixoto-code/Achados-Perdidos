import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";
import { inject, injectable } from "tsyringe";

interface IRequest{
    categoria_id?:string
}


@injectable()
class ListObjetosUseCase{
    constructor(
        @inject("ObjetosRepository")
        private objetosRepository:IObjetosRepository

    ){}

    async execute({categoria_id}:IRequest):Promise<Objetos[]> {
        const objetos = await this.objetosRepository.list(categoria_id)

        return objetos
    }
}

export {ListObjetosUseCase}