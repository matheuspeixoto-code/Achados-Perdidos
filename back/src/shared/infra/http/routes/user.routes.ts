import { CreateUserController } from "@modules/users/useCases/createUser/CreateUsersController";
import { verificarAutentificacao } from "../middlewares/verificarAutentificacao";

import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";
import { UploadUserAvatarController } from "@modules/users/useCases/uploadUserAvatar/UploadUserAvatarController";
import { GetUserByIdController } from "@modules/users/useCases/getUserById/GetUserByIdController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "@modules/users/useCases/updateInfoUser/UpdateUserController";

const userRouter = Router()


const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()
const getUserByIdController = new GetUserByIdController()
const deleteUserController = new DeleteUserController()
const updateUserController = new UpdateUserController()

const uploadAvatar=multer(uploadConfig.upload("./tmp/avatar"))


userRouter.post("/createUser",createUserController.handle)
userRouter.get("/myUser",
    verificarAutentificacao,
    getUserByIdController.handle

)

userRouter.delete("/delete",
    verificarAutentificacao,
    deleteUserController.handle

)

userRouter.put("/update",
    verificarAutentificacao,
    updateUserController.handle
)

userRouter.patch("/avatar",
    verificarAutentificacao,
    uploadAvatar.single("avatar"),
    uploadUserAvatarController.handle
)


export {userRouter}