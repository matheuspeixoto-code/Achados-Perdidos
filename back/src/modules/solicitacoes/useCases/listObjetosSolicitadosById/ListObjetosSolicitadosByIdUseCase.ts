import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { inject, injectable } from "tsyringe";
import { SolicitacoesResgate } from "@modules/solicitacoes/infra/typeorm/entities/SolicitacoesResgate";



@injectable()
class ListObjetosSolicitadosByIdUseCase {
  constructor(
    @inject("SolicitacoesRepository")
    private solicitacoesRepository: ISolicitacoesRepository
  ) {}

  async execute(id:string):Promise<SolicitacoesResgate> {
    return this.solicitacoesRepository.listSolicitadosById(id);
  }
}


export{ListObjetosSolicitadosByIdUseCase}