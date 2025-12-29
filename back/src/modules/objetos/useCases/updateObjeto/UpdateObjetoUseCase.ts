import { inject, injectable } from "tsyringe";
import { IObjetosRepository } from "@modules/objetos/implementations/IObjetosRepository";
import { IUpdateObjetosDTO } from "@modules/objetos/dtos/IUpdateObjetoDTO";
import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";

@injectable()
class UpdateObjetosUseCase {

    constructor(
        @inject("ObjetosRepository")
        private objetosRepository: IObjetosRepository
    ) {}

    async execute({
        id,
        nome,
        descricao,
        dataEncontrada,
        local,
        categoria_id,
        hora
    }: IUpdateObjetosDTO): Promise<Objetos> {

        const objeto = await this.objetosRepository.findById(id);

        if (!objeto) {
            throw new Error("Objeto não encontrado");
        }


        objeto.nome = nome ?? objeto.nome;
        objeto.descricao = descricao ?? objeto.descricao;
        objeto.local = local ?? objeto.local;
        objeto.dataEncontrada = dataEncontrada ?? objeto.dataEncontrada;
        objeto.hora = hora ?? objeto.hora;

        if (categoria_id) {
            objeto.categoria_id = categoria_id;
        }

        const objetoUpdate= await this.objetosRepository.update(objeto);
        console.log(objetoUpdate)

        return objetoUpdate
    }
}

export { UpdateObjetosUseCase };
