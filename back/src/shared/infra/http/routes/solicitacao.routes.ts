import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { SolicitarObjetosController } from "@modules/solicitacoes/useCases/solicitarObjeto/SolicitarObjetoController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { ListObjetosSolicitadosController } from "@modules/solicitacoes/useCases/listObjetosSolicitados/ListObjetosSolicitadosController";
import { ListObjetosSolicitadosByIdController } from "@modules/solicitacoes/useCases/listObjetosSolicitadosById/ListObjetosSolicitadosByIdController";
import { RejeitarSolicitacaoController } from "@modules/solicitacoes/useCases/rejeitarSolicitacao/RejeitarSolicitacaoController";
import { AceitarSolicitacaoController } from "@modules/solicitacoes/useCases/aceitarSolicitacao/AceitarSolicitacaoController";
import { ListSolicitacoesDoUsuarioController } from "@modules/solicitacoes/useCases/listSolicitacoesDoUsuario/ListSolicitacoesDoUsuarioController";

const solicitacoesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/solicitacao_image"));

const solicitarObjetosController = new SolicitarObjetosController();
const listObjetosSolicitadosController = new ListObjetosSolicitadosController()
const listObjetosSolicitadosByIdController = new ListObjetosSolicitadosByIdController()
const rejeitarSolicitacaoController = new RejeitarSolicitacaoController()
const aceitarSolicitacaoController =  new AceitarSolicitacaoController()
const listSolicitacoesDoUsuarioController = new ListSolicitacoesDoUsuarioController()

solicitacoesRoutes.post(
  "/:objeto_id",
  verificarAutentificacao,
  upload.single("imagem"),
  solicitarObjetosController.handle
);

solicitacoesRoutes.get("/pendentes",
  verificarAutentificacao,
  verificarAdmin,
  listObjetosSolicitadosController.handle
)

solicitacoesRoutes.get("/pendentes/:id",
  verificarAutentificacao,
  verificarAdmin,
  listObjetosSolicitadosByIdController.handle
)

solicitacoesRoutes.patch(
  "/rejeitar/:id",
  verificarAutentificacao,
  verificarAdmin,
  rejeitarSolicitacaoController.handle
);

solicitacoesRoutes.patch(
  "/aceitar/:id",
  verificarAutentificacao,
  verificarAdmin,
  aceitarSolicitacaoController.handle
);

solicitacoesRoutes.get(
  "/minhasSolicitacoes",
  verificarAutentificacao,
  listSolicitacoesDoUsuarioController.handle
)

export { solicitacoesRoutes };
