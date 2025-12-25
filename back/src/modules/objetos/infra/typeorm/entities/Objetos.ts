import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"
import {ObjetoStatus} from "@modules/objetos/enum/ObjetoStatus"
import { Categoria } from "./Categoria";


@Entity("objetos")
class Objetos{
    @PrimaryColumn()
    id:string;

    @Column()
    nome:string;

    @Column()
    descricao:string;

    @Column()
    dataEncontrada:Date;

    @Column({
        type: "enum",
        enum: ObjetoStatus,
        default: ObjetoStatus.ENCONTRADO,
    })
    status:ObjetoStatus;

    @ManyToOne(()=>Categoria)
    @JoinColumn({name:"categoria_id"})
    categoria_id:Categoria

    @Column()
    objeto_image:string;

    
    @Column()
    local:string

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id=uuidV4()
            this.status=ObjetoStatus.ENCONTRADO
        }
    }
}

export {Objetos}