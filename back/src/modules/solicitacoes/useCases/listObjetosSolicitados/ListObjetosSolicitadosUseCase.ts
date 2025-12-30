import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { inject, injectable } from "tsyringe";
import { SolicitacoesResgate } from "@modules/solicitacoes/infra/typeorm/entities/SolicitacoesResgate";
@injectable()
class ListObjetosSolicitadosUseCase {
  constructor(
    @inject("SolicitacoesRepository")
    private solicitacoesRepository: ISolicitacoesRepository
  ) {}

  async execute():Promise<SolicitacoesResgate[]> {
    return this.solicitacoesRepository.listSolicitados();
  }
}


export{ListObjetosSolicitadosUseCase}