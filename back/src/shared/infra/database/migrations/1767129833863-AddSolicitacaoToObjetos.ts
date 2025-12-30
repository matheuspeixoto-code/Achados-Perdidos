import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSolicitacaoToObjetos1767129833863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE objetos_status_enum 
            ADD VALUE IF NOT EXISTS 'SOLICITADO'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
