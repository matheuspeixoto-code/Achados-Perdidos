import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSolicitacoesDoUsuarioUseCase } from "./ListSolicitacoesDoUsuarioUseCase";

class ListSolicitacoesDoUsuarioController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { status } = req.query;

    const listSolicitacoesDoUsuarioUseCase = container.resolve(ListSolicitacoesDoUsuarioUseCase);

    const solicitacoes = await listSolicitacoesDoUsuarioUseCase.execute({
      user_id,
      status: status as string,
    });

    return res.status(200).json(solicitacoes);
  }
}

export { ListSolicitacoesDoUsuarioController };
