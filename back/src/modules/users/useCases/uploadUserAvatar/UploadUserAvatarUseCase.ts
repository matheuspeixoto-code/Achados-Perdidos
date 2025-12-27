import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";


interface IRequest{
    user_id:string;
    avatar_file:string;
}

@injectable()
class UploadUserAvatarUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserReposiory
    ){}

    async execute({user_id,avatar_file}:IRequest):Promise<void>{
        const user = await this.userRepository.findById(user_id)


        if(user.avatar){
            await deleteFile(`.tmp/avatar/${user.avatar}`)
        }

        user.avatar=avatar_file

        await this.userRepository.save(user)
    }
}

export {UploadUserAvatarUseCase}