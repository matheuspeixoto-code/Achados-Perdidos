import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { SolicitarObjetosController } from "@modules/solicitacoes/useCases/solicitarObjeto/SolicitarObjetoController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";

const solicitacoesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/solicitacao_image"));

const solicitarObjetosController = new SolicitarObjetosController();

solicitacoesRoutes.post(
  "/:objeto_id",
  verificarAutentificacao,
  upload.single("imagem"),
  solicitarObjetosController.handle
);

export { solicitacoesRoutes };
