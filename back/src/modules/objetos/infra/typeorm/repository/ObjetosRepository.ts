import { ICreateObjetosDTO } from "@modules/objetos/dtos/ICreateObjetosDTO";
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { Objetos } from "../entities/Objetos";
import { Repository } from "typeorm";
import { AppDataSource } from "@data";
import { ObjetoStatus } from "@modules/objetos/enum/ObjetoStatus";



class ObjetosRepository implements IObjetosRepository{
    private repository: Repository<Objetos>

    constructor(){
        this.repository = AppDataSource.getRepository(Objetos)
    }
    async updateStatus(objeto: Objetos, status: ObjetoStatus): Promise<void> {
        objeto.status=status;
        await this.repository.save(objeto)

    }


    async update(objeto: Objetos): Promise<Objetos> {
       const updateObjeto = await this.repository.save(objeto)

       return updateObjeto;
    }


    async findById(id: string): Promise<Objetos> {
        const objeto = await this.repository
                .createQueryBuilder("o")
                .leftJoinAndSelect("o.imagens", "imagens")
                .leftJoinAndSelect("o.categoria_id", "categoria")
                .where("o.id = :id", { id })
                .getOne();

        return objeto;
    }


    async create({nome,descricao,dataEncontrada,local,hora,categoria_id}: ICreateObjetosDTO): Promise<Objetos> {
        const objeto = this.repository.create({
            nome,
            descricao,
            dataEncontrada,
            local,
            categoria_id:{id:categoria_id},
            hora
        })

        await this.repository.save(objeto)

        return objeto
    }

    async list(categoria_id?: string, nome?: string): Promise<Objetos[]> {
        const objetosQuery = this.repository
            .createQueryBuilder("o")
            .leftJoinAndSelect("o.imagens", "imagens")
            .leftJoinAndSelect("o.categoria_id", "categoria")
            .where("o.status =:status",{
                status:ObjetoStatus.ENCONTRADO
            })

        if (categoria_id) {
            objetosQuery.andWhere(
                "categoria.id = :categoria_id",
                { categoria_id }
            );
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