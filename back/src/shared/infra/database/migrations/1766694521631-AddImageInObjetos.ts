import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImageInObjetos1766694521631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "objetos",
            new TableColumn({
                name: "objeto_image",
                type: "varchar",
                isNullable:true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("objetos", "objeto_image");
    }

}
