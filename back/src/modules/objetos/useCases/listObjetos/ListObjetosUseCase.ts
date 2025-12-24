import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";
import { inject, injectable } from "tsyringe";


@injectable()
class ListObjetosUseCase{
    constructor(
        @inject("ObjetosRepository")
        private objetosRepository:IObjetosRepository

    ){}

    async execute():Promise<Objetos[]> {
        const objetos = await this.objetosRepository.list()

        return objetos
    }
}

export {ListObjetosUseCase}