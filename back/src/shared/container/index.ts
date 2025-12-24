import { container } from "tsyringe";

import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { ObjetosRepository } from "@modules/objetos/infra/typeorm/repository/ObjetosRepository";
import { ICategoriaRepository } from "@modules/objetos/implementations/ICategoriaRepository";
import { CategoriaRepository } from "@modules/objetos/infra/typeorm/repository/CategoriaRepository";

container.registerSingleton<IObjetosRepository>(
    "ObjetosRepository",
    ObjetosRepository
)

container.registerSingleton<ICategoriaRepository>(
    "CategoriaRepository",
    CategoriaRepository
)