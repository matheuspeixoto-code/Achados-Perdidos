import { ICategoriaRepository } from "@modules/objetos/implementations/ICategoriaRepository";
import { Categoria } from "@modules/objetos/infra/typeorm/entities/Categoria";
import { inject, injectable } from "tsyringe";


@injectable()
class ListCategoriaUseCase{
    constructor(
        @inject("CategoriaRepository")
        private categoriaRepository:ICategoriaRepository
    ){}
    async execute():Promise<Categoria[]>{
        const categorias = await this.categoriaRepository.list()

        return categorias
    }
}

export {ListCategoriaUseCase}