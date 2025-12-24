import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest{
    nome:string;
    descricao:string;
    local:string;
    dataEncontrada?:Date;
    categoria_id:string;
    
}

@injectable()
class CreateObjetosUseCase{
    constructor(
        @inject("ObjetosRepository")
        private objetosRepository: IObjetosRepository 
    ){}
    async execute({nome,descricao,local,dataEncontrada,categoria_id}:IRequest):Promise<Objetos>{
        if(!nome || nome.trim() === "" ){
            throw new AppError("Informe o nome do objeto")
        }

        if(!descricao || descricao.trim() === "" ){
            throw new AppError("Informe a descrição do objeto")
        }

        if(!local || local.trim() === "" ){
            throw new AppError("Informe o local onde o objeto foi encontrado")
        }

        const objeto = await this.objetosRepository.create({
            nome,
            descricao,
            local,
            dataEncontrada,
            categoria_id
        })

        return objeto

    }
}

export {CreateObjetosUseCase}