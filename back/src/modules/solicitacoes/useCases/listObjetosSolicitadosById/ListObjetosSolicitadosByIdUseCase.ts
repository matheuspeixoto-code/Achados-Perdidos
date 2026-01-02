import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { inject, injectable } from "tsyringe";
import { SolicitacoesResgate } from "@modules/solicitacoes/infra/typeorm/entities/SolicitacoesResgate";
import { validate as isUUID } from "uuid";
import { AppError } from "@shared/infra/errors/AppError";


@injectable()
class ListObjetosSolicitadosByIdUseCase {
  constructor(
    @inject("SolicitacoesRepository")
    private solicitacoesRepository: ISolicitacoesRepository
  ) {}

  async execute(id:string):Promise<SolicitacoesResgate> {
    if (!isUUID(id)) {
      throw new AppError("ID inválido", 400);
    }
    return this.solicitacoesRepository.listSolicitadosById(id);
  }
}


export{ListObjetosSolicitadosByIdUseCase}