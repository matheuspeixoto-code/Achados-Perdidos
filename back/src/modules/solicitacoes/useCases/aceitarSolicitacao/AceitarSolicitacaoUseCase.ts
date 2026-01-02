import { inject, injectable } from "tsyringe";
import { validate as isUUID } from "uuid";

import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { SolicitacaoStatus } from "@modules/solicitacoes/enum/SolicitacaoStatus";
import { ObjetoStatus } from "@modules/objetos/enum/ObjetoStatus";
import { AppError } from "@shared/infra/errors/AppError";

interface IRequest {
  solicitacao_id: string;
}

@injectable()
class AceitarSolicitacaoUseCase {
  constructor(
    @inject("SolicitacoesRepository")
    private solicitacoesRepository: ISolicitacoesRepository,

    @inject("ObjetosRepository")
    private objetosRepository: IObjetosRepository
  ) {}

  async execute({ solicitacao_id }: IRequest): Promise<void> {

    if (!isUUID(solicitacao_id)) {
      throw new AppError("ID da solicitação inválido", 400);
    }

    const solicitacao =
      await this.solicitacoesRepository.listSolicitadosById(solicitacao_id);

    if (!solicitacao) {
      throw new AppError("Solicitação não encontrada", 404);
    }

    if (solicitacao.status !== SolicitacaoStatus.PENDENTE) {
      throw new AppError("Solicitação já foi analisada", 400);
    }

    this.solicitacoesRepository.rejeirarSolicitacao(
        solicitacao,
        SolicitacaoStatus.APROVADA
    )

    this.objetosRepository.updateStatus(
        solicitacao.objeto,
        ObjetoStatus.DEVOLVIDO
    )
    
  }
}

export { AceitarSolicitacaoUseCase };
