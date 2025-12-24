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
    async findById(id: string): Promise<Objetos> {
        const objeto = await this.repository.findOne({where:{id}})

        return objeto
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

    async list(categoria_id?: string,nome?:string): Promise<Objetos[]> {
        const objetosQuery = this.repository
            .createQueryBuilder("o");

        if (categoria_id) {
            objetosQuery
                .innerJoin("o.categoria_id", "categoria")
                .where("categoria.id = :categoria_id", { categoria_id });
        }
        if (nome) {
            objetosQuery.andWhere(
                "o.nome ILIKE :nome",
                { nome: `%${nome}%` }
            );
        }


        return await objetosQuery.getMany();
    }



}

export {ObjetosRepository}