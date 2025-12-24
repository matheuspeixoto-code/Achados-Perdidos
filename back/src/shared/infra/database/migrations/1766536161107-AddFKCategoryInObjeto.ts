import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKCategoryInObjeto1766536161107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "objetos",
            new TableForeignKey({
                name: "FKCategoriaObjetos",
                columnNames: ["categoria_id"], 
                referencedTableName: "categorias", 
                referencedColumnNames: ["id"], 
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("objetos", "FKCategoryObjetos");
    }

}
