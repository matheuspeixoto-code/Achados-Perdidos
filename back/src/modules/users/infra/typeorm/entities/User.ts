import { Sexo } from "@modules/users/enum/Sexo";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import {v4 as uuidV4} from "uuid"
import { Endereco } from "./Endereco";


@Entity("users")
class User{

    @PrimaryColumn()
    id:string

    @Column()
    cpf:string;

    @OneToMany(() => Endereco, endereco => endereco.user)
    enderecos: Endereco[];

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

    @Column()
    avatar?:string;

    @CreateDateColumn()
    created_at:Date
    
    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt?: Date;

    constructor(){
        if(!this.id){
            this.id=uuidV4()
        }
    }

}

export {User}