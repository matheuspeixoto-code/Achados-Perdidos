import { IUpdateEndereco } from "@modules/users/dtos/IUpdateEndereco";
import { Sexo } from "@modules/users/enum/Sexo";
import { IEnderecoRepository } from "@modules/users/implementations/IEnderecoRepository";
import { IUserReposiory } from "@modules/users/implementations/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { validarCPF } from "@modules/users/validação/ValidarCPF";
import { validarEmail } from "@modules/users/validação/ValidarEmail";
import { AppError } from "@shared/infra/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";


interface IRequest{
    cpf?:string;
    telefone?:string;
    username?:string;
    nome_completo?:string;
    email?:string;
    senha?:string;
    genero?:Sexo;
    data_nascimento?:Date,
    endereco?:IUpdateEndereco
}


@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserReposiory,

    @inject("EnderecoRepository")
    private enderecoRepository: IEnderecoRepository
  ) {}

  async execute(user_id: string, data: IRequest): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user || user.deletedAt) {
      throw new AppError("Usuário não encontrado");
    }


    if (data.cpf) {
      if (!validarCPF(data.cpf)) {
        throw new AppError("CPF inválido");
      }
      user.cpf = data.cpf;
    }


    if (data.email) {
      if (!validarEmail(data.email)) {
        throw new AppError("Email inválido");
      }

      if (data.email !== user.email) {
        const emailExists = await this.userRepository.findByEmail(data.email);
        if (emailExists) {
          throw new AppError("Não foi possível atualizar os dados com o email informado");
        }
        user.email = data.email;
      }
    }


    if (data.genero) {
      if (!Object.values(Sexo).includes(data.genero)) {
        throw new AppError("Gênero inválido");
      }
      user.genero = data.genero;
    }


    Object.assign(user, {
      telefone: data.telefone ?? user.telefone,
      username: data.username ?? user.username,
      nome_completo: data.nome_completo ?? user.nome_completo,
      data_nascimento: data.data_nascimento ?? user.data_nascimento,
    });

    
    if (data.senha) {
      user.senha = await hash(data.senha, 8);
    }

 
    if (data.endereco) {
        const endereco =
            await this.enderecoRepository.findByUserId(user_id);

        if (!endereco) {
            throw new AppError("Endereço não encontrado para este usuário");
        }

        Object.assign(endereco, {
            cep: data.endereco.cep ?? endereco.cep,
            rua: data.endereco.rua ?? endereco.rua,
            bairro: data.endereco.bairro ??endereco.bairro,
            numero: data.endereco.numero ?? endereco.numero,
        });

        endereco.user = user;

        await this.enderecoRepository.save(endereco);
    }

    const userAtualizado = await this.userRepository.findById(user.id);


    await this.userRepository.save(userAtualizado);

    return userAtualizado;
  }
}



export {UpdateUserUseCase}