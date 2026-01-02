import { SolicitacoesResgate } from "../infra/typeorm/entities/SolicitacoesResgate"
import { ICreateSolicitacoesDTO } from "../dtos/ICreateSolicitacoesDTO"
import { SolicitacaoStatus } from "../enum/SolicitacaoStatus";


interface ISolicitacoesRepository{
    create(data:ICreateSolicitacoesDTO):Promise<SolicitacoesResgate>;
    findByObjetoId(id:string):Promise<SolicitacoesResgate>;
    listSolicitados():Promise<SolicitacoesResgate[]>;
    listSolicitadosById(id:string):Promise<SolicitacoesResgate>;
    rejeirarSolicitacao(solicitacao:SolicitacoesResgate,status:SolicitacaoStatus):Promise<void>
    aceitarSolicitacao(solicitacao:SolicitacoesResgate,status:SolicitacaoStatus):Promise<void>
}

export {ISolicitacoesRepository}