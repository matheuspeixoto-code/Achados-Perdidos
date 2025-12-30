import { Objetos } from "@modules/objetos/infra/typeorm/entities/Objetos";
import { SolicitacaoStatus } from "@modules/solicitacoes/enum/SolicitacaoStatus";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"

@Entity("solicitacoes_resgate")
class SolicitacoesResgate {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "usuario_id" })
    usuario: User;

    @ManyToOne(() => Objetos)
    @JoinColumn({ name: "objeto_id" })
    objeto: Objetos;

    @Column()
    descricao: string;

    @Column({ nullable: true })
    imagem?: string;

    @Column({
        type: "enum",
        enum: SolicitacaoStatus,
        default: SolicitacaoStatus.PENDENTE,
    })
    status: SolicitacaoStatus;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    respondida_em?: Date;

    constructor() {
        if (!this.id) this.id = uuidV4();
    }
}

export {SolicitacoesResgate}