import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";



@Entity("objetos_image")
class ObjetosImage{

    @PrimaryColumn()
    id:string;

    @Column()
    objeto_id:string;

    @Column()
    image_objeto:string;

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id=uuidV4()
        }
    }
}

export {ObjetosImage}