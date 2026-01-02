import { ObjetoStatus } from "@modules/objetos/enum/ObjetoStatus"
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository"
import { SolicitacaoStatus } from "@modules/solicitacoes/enum/SolicitacaoStatus"
import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository"
import { AppError } from "@shared/infra/errors/AppError"
import { inject, injectable } from "tsyringe"
import { validate as isUUID } from "uuid";



interface IRequest{
    solicitacao_id:string
}

@injectable()
class RejeitarSolicitacaoUseCase{
    constructor(
        @inject("SolicitacoesRepository")
        private solicitacoesRepository:ISolicitacoesRepository,

        @inject("ObjetosRepository")
        private objetosrepository:IObjetosRepository
    ){}
    async execute({solicitacao_id}:IRequest):Promise<void>{
        if (!isUUID(solicitacao_id)) {
            throw new AppError("ID inválido", 400);
        }
        const solicitacao = await this.solicitacoesRepository.listSolicitadosById(solicitacao_id)

        if(!solicitacao){
            throw new AppError("Solicitação não encontrada")
        }

        if(solicitacao.status !== SolicitacaoStatus.PENDENTE){
            throw new AppError("Solicitação já foi analisada")
        }

        this.solicitacoesRepository.rejeirarSolicitacao(
            solicitacao,
            SolicitacaoStatus.REJEITADA
        )

        this.objetosrepository.updateStatus(
            solicitacao.objeto,
            ObjetoStatus.ENCONTRADO
        )
    }
}

export{RejeitarSolicitacaoUseCase}