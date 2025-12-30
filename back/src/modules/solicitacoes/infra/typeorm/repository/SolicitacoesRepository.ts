import { AppDataSource } from "@data"
import { Repository } from "typeorm"
import { SolicitacoesResgate } from "../entities/SolicitacoesResgate"
import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository"
import { ICreateSolicitacoesDTO } from "@modules/solicitacoes/dtos/ICreateSolicitacoesDTO"




class SolicitacoesRepository implements ISolicitacoesRepository{
    private repository: Repository<SolicitacoesResgate>

    constructor(){
        this.repository= AppDataSource.getRepository(SolicitacoesResgate)
    }
    async listSolicitadosById(id: string): Promise<SolicitacoesResgate> {
        const solicitacao = await this.repository
            .createQueryBuilder("s")
            .leftJoinAndSelect("s.usuario", "u")
            .leftJoinAndSelect("s.objeto", "o")
            .leftJoinAndSelect("o.imagens", "imagens")
            .leftJoinAndSelect("o.categoria_id", "categoria")
            .select([

            "s.id",
            "s.descricao",
            "s.imagem",
            "s.status",
            "s.created_at",
            

      
            "u.id",
            "u.nome_completo",
            "u.avatar",
            "u.email",

            
            "o.id",
            "o.nome",
            "o.descricao",
            "o.local",
            "o.hora",
            "o.status",
            "o.dataEncontrada",

           
            "categoria.id",
            "categoria.nome",

           
            "imagens.id",
            "imagens.objeto_image",
            ])
            .where("s.id = :id", { id })
            .getOne();

        return solicitacao;
    }


    async listSolicitados(): Promise<SolicitacoesResgate[]> {
        const solicitacoes = await this.repository
            .createQueryBuilder("s")
            .leftJoin("s.usuario", "u")
            .leftJoin("s.objeto", "o")
            .select([
                "s.id",
                "s.status",
                "s.created_at",

                "u.id",
                "u.nome_completo",
                "u.avatar",

                "o.id",
                "o.nome",
                "o.status",
            ])
            .getMany();

        return solicitacoes;
    }


    async findByObjetoId(objeto_id: string): Promise<SolicitacoesResgate> {
        return await this.repository.findOne({
            where: {
                objeto: { id: objeto_id }
            }
        })
    }

    
    async create({usuario_id,objeto_id,justificativa,status,imagem}: ICreateSolicitacoesDTO): Promise<SolicitacoesResgate> {

        const solicitacao = this.repository.create({
            objeto:{id:objeto_id},
            usuario:{id:usuario_id},
            descricao:justificativa,
            status,
            imagem
        })

        await this.repository.save(solicitacao)

        return solicitacao

    }


}

export {SolicitacoesRepository}