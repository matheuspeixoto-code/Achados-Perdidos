import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";
import { Objetos } from "./Objetos";



@Entity("objetos_image")
class ObjetosImage{

    @PrimaryColumn()
    id:string;

    @ManyToOne(() => Objetos, objeto => objeto.imagens, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "objeto_id" })
    objeto: Objetos;

    @Column()
    objeto_image:string;

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id=uuidV4()
        }
    }
}

export {ObjetosImage}