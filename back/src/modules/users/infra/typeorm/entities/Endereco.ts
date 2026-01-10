import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"
import { User } from "./User";

@Entity("enderecos")
class Endereco{

    @PrimaryColumn()
    id:string;

    @Column()
    user_id:string;

    @OneToOne(()=>User,user=>user.endereco,{onDelete: "CASCADE"})
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