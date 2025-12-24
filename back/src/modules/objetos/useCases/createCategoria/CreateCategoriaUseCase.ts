import { ICategoriaRepository } from "@modules/objetos/implementations/ICategoriaRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    nome:string;
}

@injectable()
class CreateCategoriaUseCase{
    constructor(
        @inject("CategoriaRepository")
        private categoriaRepository:ICategoriaRepository
    ){}
    async execute({nome}:IRequest): Promise<void>{
        const categoriaExistente = await this.categoriaRepository.findByName(nome)

        if(categoriaExistente){
            throw new AppError("categoria já existente",409)
        }

        this.categoriaRepository.create({nome})
    }
}

export {CreateCategoriaUseCase}