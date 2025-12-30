import { SolicitacoesResgate } from "../infra/typeorm/entities/SolicitacoesResgate"
import { ICreateSolicitacoesDTO } from "../dtos/ICreateSolicitacoesDTO"


interface ISolicitacoesRepository{
    create(data:ICreateSolicitacoesDTO):Promise<SolicitacoesResgate>;
    findByObjetoId(id:string):Promise<SolicitacoesResgate>;
    listSolicitados():Promise<SolicitacoesResgate[]>
    listSolicitadosById(id:string):Promise<SolicitacoesResgate>
}

export {ISolicitacoesRepository}