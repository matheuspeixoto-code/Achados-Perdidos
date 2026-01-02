import { ISolicitacoesRepository } from "@modules/solicitacoes/implementations/ISolicitacoesRepository";
import { SolicitacoesResgate } from "@modules/solicitacoes/infra/typeorm/entities/SolicitacoesResgate";
import { injectable,inject } from "tsyringe";


interface IRequest{
    user_id:string,
    status?:string
}

@injectable()
class ListSolicitacoesDoUsuarioUseCase{
    constructor(
        @inject("SolicitacoesRepository")
        private solicitacoesRepository: ISolicitacoesRepository
    ){}
    async execute({user_id,status}:IRequest):Promise<SolicitacoesResgate[]>{
        return await this.solicitacoesRepository.listByUser(user_id,status)
    }
}

export {ListSolicitacoesDoUsuarioUseCase}