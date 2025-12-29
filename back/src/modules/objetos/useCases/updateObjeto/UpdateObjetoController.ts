import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateObjetosUseCase } from "./UpdateObjetoUseCase";

class UpdateObjetosController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const {
            nome,
            descricao,
            dataEncontrada,
            local,
            categoria_id,
            hora
        } = req.body;

        const updateObjetosUseCase = container.resolve(
            UpdateObjetosUseCase
        );

        const objeto =await updateObjetosUseCase.execute({
            id,
            nome,
            descricao,
            dataEncontrada,
            local,
            categoria_id,
            hora
        });


        return res.status(204).json(objeto);
    }
}

export { UpdateObjetosController };
