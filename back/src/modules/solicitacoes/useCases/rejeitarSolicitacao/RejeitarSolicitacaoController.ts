import { Request,Response } from "express"
import { container } from "tsyringe";
import { RejeitarSolicitacaoUseCase } from "./RejeitarSolicitacaoUseCase";


class RejeitarSolicitacaoController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params;

        const rejeitarSolicitacao = container.resolve(RejeitarSolicitacaoUseCase)

        await rejeitarSolicitacao.execute({
            solicitacao_id:id
        })

        return response.status(204).send()
    }
}

export {RejeitarSolicitacaoController}