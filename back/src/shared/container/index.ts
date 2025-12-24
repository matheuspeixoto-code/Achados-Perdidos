import { container } from "tsyringe";

import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { ObjetosRepository } from "@modules/objetos/infra/typeorm/repository/ObjetosRepository";

container.registerSingleton<IObjetosRepository>(
    "ObjetosRepository",
    ObjetosRepository
)