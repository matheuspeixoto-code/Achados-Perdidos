import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"
import { User } from "./User";

@Entity("enderecos")
class Endereco{

    @PrimaryColumn()
    id:string;

    @Column()
    user_id:string;

    @ManyToOne(()=>User,user=>user.enderecos)
    @JoinColumn({name:"user_id"})
    user:User

    @Column()
    cep:string;

    @Column()
    rua:string;

    @Column()
    bairro:string;

    @Column()
    numero:string;

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id=uuidV4();
        }
    }
}


export {Endereco}