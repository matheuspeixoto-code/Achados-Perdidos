import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { SolicitarObjetosController } from "@modules/solicitacoes/useCases/solicitarObjeto/SolicitarObjetoController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { ListObjetosSolicitadosController } from "@modules/solicitacoes/useCases/listObjetosSolicitados/ListObjetosSolicitadosController";
import { ListObjetosSolicitadosByIdController } from "@modules/solicitacoes/useCases/listObjetosSolicitadosById/ListObjetosSolicitadosByIdController";

const solicitacoesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/solicitacao_image"));

const solicitarObjetosController = new SolicitarObjetosController();
const listObjetosSolicitadosController = new ListObjetosSolicitadosController()
const listObjetosSolicitadosByIdController = new ListObjetosSolicitadosByIdController()

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

export { solicitacoesRoutes };
