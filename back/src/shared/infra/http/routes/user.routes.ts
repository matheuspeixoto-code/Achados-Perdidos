import { CreateUserController } from "@modules/users/useCases/createUser/CreateUsersController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";

import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";
import { UploadUserAvatarController } from "@modules/users/useCases/uploadUserAvatar/UploadUserAvatarController";

const userRouter = Router()


const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()

const uploadAvatar=multer(uploadConfig.upload("./tmp/avatar"))


userRouter.post("/createUser",createUserController.handle)

userRouter.patch("/avatar",
    verificarAutentificacao,
    uploadAvatar.single("avatar"),
    uploadUserAvatarController.handle
)


export {userRouter}