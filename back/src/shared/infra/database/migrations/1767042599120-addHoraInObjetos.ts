import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHoraInObjetos1767042599120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "objetos",
            new TableColumn({
                name:"hora",
                type:"time",
                isNullable:true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("objetos", "hora");
    }

}
