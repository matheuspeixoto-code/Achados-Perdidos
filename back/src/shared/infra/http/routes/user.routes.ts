import { CreateUserController } from "@modules/users/useCases/createUser/CreateUsersController";
import { Router } from "express";

const userRouter = Router()

const createUserController = new CreateUserController()


userRouter.post("/createUser",createUserController.handle)


export {userRouter}