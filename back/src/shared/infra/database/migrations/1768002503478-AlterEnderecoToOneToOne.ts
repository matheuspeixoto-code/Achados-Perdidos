import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

export class AlterEnderecoToOneToOne1768002503478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("enderecos");
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("user_id")
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("enderecos", foreignKey);
        }

        const index = table?.indices.find(
            index => index.columnNames.includes("user_id")
        );

        if (index) {
            await queryRunner.dropIndex("enderecos", index);
        }

        await queryRunner.createIndex(
            "enderecos",
            new TableIndex({
                name: "IDX_ENDERECOS_USER_ID_UNIQUE",
                columnNames: ["user_id"],
                isUnique: true,
            })
        );

        await queryRunner.createForeignKey(
            "enderecos",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("enderecos");
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("user_id")
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("enderecos", foreignKey);
        }


        const index = table?.indices.find(
            index => index.name === "IDX_ENDERECOS_USER_ID_UNIQUE"
        );

        if (index) {
            await queryRunner.dropIndex("enderecos", index);
        }

        await queryRunner.createIndex(
            "enderecos",
            new TableIndex({
                name: "IDX_ENDERECOS_USER_ID",
                columnNames: ["user_id"],
            })
        );
    }
}
