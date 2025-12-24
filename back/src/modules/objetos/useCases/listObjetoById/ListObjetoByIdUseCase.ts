import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";
import { inject, injectable } from "tsyringe";

interface IRequest{

    id:string
}


@injectable()
class ListObjetosByIdUseCase{
    constructor(
        @inject("ObjetosRepository")
        private objetosRepository:IObjetosRepository

    ){}

    async execute({id}:IRequest):Promise<Objetos> {
        const objetos = await this.objetosRepository.findById(id)

        return objetos
    }
}

export {ListObjetosByIdUseCase}