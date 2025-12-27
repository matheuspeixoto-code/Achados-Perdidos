import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEndereco1766867219976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enderecos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "cep",
                        type: "varchar"
                    },
                    {
                        name: "rua",
                        type: "varchar"
                    },
                    {
                        name: "numero",
                        type: "varchar"
                    },
                    {
                        name: "bairro",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKEnderecoUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("enderecos")
    }

}
