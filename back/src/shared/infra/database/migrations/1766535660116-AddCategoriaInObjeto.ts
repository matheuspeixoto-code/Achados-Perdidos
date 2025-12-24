import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCategoriaInObjeto1766535660116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "objetos",
            new TableColumn({
                name: "categoria_id",
                type: "uuid",
                isNullable: true, 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("objetos", "categoria");
    }

}
