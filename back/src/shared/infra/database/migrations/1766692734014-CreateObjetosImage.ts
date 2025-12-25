import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateObjetosImage1766692734014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"objetos_image",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"objeto_id",
                        type:"uuid"
                    },
                    {
                        name:"image_objeto",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKObjetoImage",
                        referencedTableName:"objetos",
                        referencedColumnNames:["id"],
                        columnNames:["objeto_id"],
                        onDelete: "SET NULL",
                        onUpdate:"SET NULL"
                    }
                ]
                
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("objetos_image")
    }

}
