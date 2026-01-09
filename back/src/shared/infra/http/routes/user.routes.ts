import { CreateUserController } from "@modules/users/useCases/createUser/CreateUsersController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";

import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";
import { UploadUserAvatarController } from "@modules/users/useCases/uploadUserAvatar/UploadUserAvatarController";
import { GetUserByIdController } from "@modules/users/useCases/getUserById/GetUserByIdController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";

const userRouter = Router()


const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()
const getUserByIdController = new GetUserByIdController()
const deleteUserController = new DeleteUserController()

const uploadAvatar=multer(uploadConfig.upload("./tmp/avatar"))


userRouter.post("/createUser",createUserController.handle)
userRouter.get("/:id",
    verificarAutentificacao,
    getUserByIdController.handle

)

userRouter.delete("/delete",
    verificarAutentificacao,
    deleteUserController.handle

)

userRouter.patch("/avatar",
    verificarAutentificacao,
    uploadAvatar.single("avatar"),
    uploadUserAvatarController.handle
)


export {userRouter}