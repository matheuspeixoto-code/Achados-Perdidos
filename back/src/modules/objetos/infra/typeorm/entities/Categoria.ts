import {v4 as uuidV4} from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"


@Entity("categorias")
class Categoria{
    @PrimaryColumn()
    id?:string;

    @Column()
    name:string;
    

    @CreateDateColumn() 
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id=uuidV4();
        }
    }

}

export {Categoria}