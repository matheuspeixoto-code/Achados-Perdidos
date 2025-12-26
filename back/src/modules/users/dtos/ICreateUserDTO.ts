import { Sexo } from "../enum/Sexo";

interface ICreateUserDTO{
    cpf:string;

    telefone:string;

    username:string;

    nome_completo:string;

    email:string;

    senha:string;

    genero:Sexo;

    data_nascimento:Date
}

export {ICreateUserDTO}