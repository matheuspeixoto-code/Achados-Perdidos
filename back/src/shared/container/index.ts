import { container } from "tsyringe";

import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { ObjetosRepository } from "@modules/objetos/infra/typeorm/repository/ObjetosRepository";
import { ICategoriaRepository } from "@modules/objetos/implementations/ICategoriaRepository";
import { CategoriaRepository } from "@modules/objetos/infra/typeorm/repository/CategoriaRepository";
import { IObjetosImageRepository } from "@modules/objetos/implementations/IObjetosImageRepository";
import { ObjetosImagesRepository } from "@modules/objetos/infra/typeorm/repository/ObjetoImageRepository";
import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { UserRepository } from "@modules/users/infra/typeorm/repository/UserRepository";

container.registerSingleton<IObjetosRepository>(
    "ObjetosRepository",
    ObjetosRepository
)

container.registerSingleton<IObjetosImageRepository>(
    "ObjetosImagesRepository",
    ObjetosImagesRepository
)

container.registerSingleton<ICategoriaRepository>(
    "CategoriaRepository",
    CategoriaRepository
)

container.registerSingleton<IUserReposiory>(
    "UserRepository",
    UserRepository
)