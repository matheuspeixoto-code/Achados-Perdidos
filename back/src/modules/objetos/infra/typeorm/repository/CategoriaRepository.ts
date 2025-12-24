import { ICategoriaRepository } from "@modules/objetos/implementations/ICategoriaRepository";
import { ICreateCategoriaDTO } from "@modules/objetos/dtos/ICreatecategoriaDTO";
import { Categoria } from "../entities/Categoria";
import { AppDataSource } from "@data";
import { Repository } from "typeorm";


class CategoriaRepository implements ICategoriaRepository{
    private repository:Repository<Categoria>

    constructor(){
        this.repository=AppDataSource.getRepository(Categoria);
    }


    async findByName(nome: string): Promise<Categoria> {
        const categoria= await this.repository.findOne({ where:{nome} })
        return categoria;
    }

    async list(): Promise<Categoria[]> {
        const categorias=this.repository.find();
        return categorias
    }

    async create({nome}: ICreateCategoriaDTO): Promise<void> {
        const categoria= this.repository.create({nome}) 

        await this.repository.save(categoria)
    }

}

export {CategoriaRepository}