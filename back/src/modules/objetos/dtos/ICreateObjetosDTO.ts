

interface ICreateObjetosDTO{
    nome:string;
    descricao:string;
    local:string;
    dataEncontrada?:Date;
    categoria_id:string;
}

export {ICreateObjetosDTO}