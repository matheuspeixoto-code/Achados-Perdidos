import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../infra/typeorm/entities/User"


interface IUserReposiory{
    create(data:ICreateUserDTO): Promise<User>;
    findByEmail(email:string):Promise<User>;
    findById(id:string):Promise<User>;
}

export {IUserReposiory}