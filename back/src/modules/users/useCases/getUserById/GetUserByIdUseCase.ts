import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";




@injectable()
class GetUserByIdUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory,
    ){}
    async execute(id:string):Promise<User>{
        const user = await this.userRepository.findById(id)

        return user

    }
}

export{GetUserByIdUseCase}