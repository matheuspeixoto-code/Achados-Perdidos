import { Categoria } from "../infra/typeorm/entities/Categoria";

interface IUpdateObjetosDTO {
    id: string;
    nome?: string;
    descricao?: string;
    dataEncontrada?: Date;
    hora?:string;
    local?: string;
    categoria_id?: Categoria;
}

export { IUpdateObjetosDTO };