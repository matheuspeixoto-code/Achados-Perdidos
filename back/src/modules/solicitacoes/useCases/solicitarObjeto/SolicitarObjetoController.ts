import { Request,Response } from "express"
import { container } from "tsyringe";
import { SolicitarObjetoUseCase } from "./SolicitarObjetoUseCase";

class SolicitarObjetosController{
    async handle(request:Request,response:Response):Promise<Response>{
        const { justificativa } = request.body;
        const { objeto_id } = request.params;
        const usuario_id = request.user.id;

        const imagem = request.file?.filename;

        const solicitarObjetoUseCase = container.resolve(SolicitarObjetoUseCase);

        const solicitacao = await solicitarObjetoUseCase.execute({
            usuario_id,
            objeto_id,
            justificativa,
            imagem
        });

        return response.status(201).json(solicitacao);
    }
}

export {SolicitarObjetosController}