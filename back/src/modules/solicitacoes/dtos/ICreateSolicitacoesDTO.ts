import { SolicitacaoStatus } from "../enum/SolicitacaoStatus";


interface ICreateSolicitacoesDTO{
    usuario_id:string;
    objeto_id:string;
    justificativa:string;
    status:SolicitacaoStatus;
    imagem?: string;
}

export{ICreateSolicitacoesDTO}