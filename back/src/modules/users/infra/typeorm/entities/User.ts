import { Sexo } from "@modules/users/enum/Sexo";
import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from "typeorm";
import {v4 as uuidV4} from "uuid"


@Entity("users")
class User{

    @PrimaryColumn()
    id:string

    @Column()
    cpf:string;

    @Column()
    telefone:string;

    @Column()
    username:string;

    @Column()
    nome_completo:string;

    @Column()
    email:string;

    @Column()
    senha:string;

    @Column()
    isAdmin:boolean;

    @Column({
        type:"enum",
        enum:Sexo,
        enumName:"sexo_enum"
    })
    genero:Sexo;

    @Column()
    data_nascimento:Date

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id=uuidV4()
        }
    }

}

export {User}