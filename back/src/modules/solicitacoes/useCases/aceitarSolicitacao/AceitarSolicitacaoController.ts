import { Request,Response } from "express"
import { container } from "tsyringe";
import { AceitarSolicitacaoUseCase } from "./AceitarSolicitacaoUseCase";



class AceitarSolicitacaoController{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id} = request.params;

        const aceitarSolicitacao = container.resolve(AceitarSolicitacaoUseCase)

        await aceitarSolicitacao.execute({
            solicitacao_id:id
        })

        return response.status(204).send()
    }
}

export {AceitarSolicitacaoController}