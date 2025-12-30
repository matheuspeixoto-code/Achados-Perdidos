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