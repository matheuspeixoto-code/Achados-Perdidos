import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSolicitacao1767049778890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: "solicitacoes_resgate",
            columns: [
                { 
                    name: "id", type: "uuid", isPrimary: true 
                },
                { 
                    name: "usuario_id", type: "uuid" 
                },
                { 
                    name: "objeto_id", type: "uuid" 
                },
                { 
                    name: "descricao", type: "varchar" 
                },
                { 
                    name: "status", type: "enum",enum:["PENDENTE","APROVADA","REJEITADA"] ,default: "'PENDENTE'" 
                },
                { 
                    name: "created_at", type: "timestamp", default: "now()" 
                },
                { 
                    name: "respondida_em", type: "timestamp", isNullable: true 
                }
            ],
            foreignKeys: [
                {
                    name: "FKUsuarioSolicitacao",
                    columnNames: ["usuario_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                },
                {
                    columnNames: ["objeto_id"],
                    referencedTableName: "objetos",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        })
    );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("solicitacoes_resgate")
    }

}
