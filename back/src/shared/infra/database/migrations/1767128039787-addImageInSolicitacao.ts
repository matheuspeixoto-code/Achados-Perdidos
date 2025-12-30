import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImageInSolicitacao1767128039787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "solicitacoes_resgate",
            new TableColumn({
                name:"imagem",
                type:"varchar",
                isNullable:true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("solicitacoes_resgate","imagem")
    }

}
