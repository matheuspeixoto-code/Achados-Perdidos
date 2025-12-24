import { ICreateObjetosDTO } from "@modules/objetos/dtos/ICreateObjetosDTO";
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "../entities/Objetos";
import { Repository } from "typeorm";
import { AppDataSource } from "@data";



class ObjetosRepository implements IObjetosRepository{
    private repository: Repository<Objetos>

    constructor(){
        this.repository = AppDataSource.getRepository(Objetos)
    }

    async create({nome,descricao,dataEncontrada,local,categoria_id}: ICreateObjetosDTO): Promise<Objetos> {
        const objeto = this.repository.create({
            nome,
            descricao,
            dataEncontrada,
            local,
            categoria_id:{id:categoria_id}
        })

        await this.repository.save(objeto)

        return objeto
    }

    async list(): Promise<Objetos[]> {
        const objetos = this.repository.find()

        return objetos
    }


}

export {ObjetosRepository}