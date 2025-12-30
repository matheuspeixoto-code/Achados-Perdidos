import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { SolicitacoesResgate } from "@modules/solicitacoes/infra/typeorm/entities/SolicitacoesResgate";
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/infra/errors/AppError";
import { ObjetoStatus } from "@modules/objetos/enum/ObjetoStatus";
import { SolicitacaoStatus } from "@modules/solicitacoes/enum/SolicitacaoStatus";


interface IRequest {
  usuario_id: string;
  objeto_id: string;
  justificativa: string;
  imagem?: string;
}

@injectable()
class SolicitarObjetoUseCase{
    constructor(
        @inject("SolicitacoesRepository")
        private solicitacaoRepository:ISolicitacoesRepository,

        @inject("ObjetosRepository")
        private objetosRepository: IObjetosRepository
    ){}

    async execute({usuario_id,objeto_id,justificativa,imagem}:IRequest):Promise<SolicitacoesResgate>{
        const objeto = await this.objetosRepository.findById(objeto_id)
    

        if(!objeto){
            throw new AppError("Objeto não existe")
        }

        if(objeto.status===ObjetoStatus.SOLICITADO){
            throw new AppError("Objetos não está disponível para a solicitação")
        }

        const solicitacaoExistente = await this.solicitacaoRepository.findByObjetoId(objeto_id)

        if(solicitacaoExistente && solicitacaoExistente.status===SolicitacaoStatus.PENDENTE){
            throw new AppError("Já existe uma solicitação pendente para este objeto")
        }

        const solicitacao = await this.solicitacaoRepository.create({
            usuario_id,
            objeto_id,
            justificativa,
            status:SolicitacaoStatus.PENDENTE,
            imagem
        })


        await this.objetosRepository.updateStatus(
            objeto,ObjetoStatus.SOLICITADO
        )

        return solicitacao

    }
}

export {SolicitarObjetoUseCase}