import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory
    ){}

    async execute(id:string):Promise<void> {
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new AppError("Usuario nao existe")
        }

        await this.userRepository.deleteUser(user)
    }
}

export{DeleteUserUseCase}