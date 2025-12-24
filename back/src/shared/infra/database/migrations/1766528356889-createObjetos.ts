import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateObjetos1766528356889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"objetos",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"nome",
                        type:"varchar",
                    },
                    {
                        name:"descricao",
                        type:"varchar"
                    },
                    {
                        name:"local",
                        type:"varchar"
                    },
                    {
                        name:"dataEncontrada",
                        type:"timestamp"
                    },
                    {
                        name:"status",
                        type:"enum",
                        enum:[
                            "ENCONTRADO",
                            "DISPONIVEL",
                            "REIVINDICADO",
                            "DEVOLVIDO",
                            "DESCARTADO",
                        ],
                        default:`'ENCONTRADO'`
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("objetos");

    }

}
