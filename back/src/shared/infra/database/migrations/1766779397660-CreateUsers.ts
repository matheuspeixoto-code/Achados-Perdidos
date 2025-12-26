import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1766779397660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"cpf",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"telefone",
                        type:"varchar",

                    },
                    {
                        name:"username",
                        type:"varchar"
                    },
                    {
                        name:"nome_completo",
                        type:"varchar",
                    },
                    {
                        name:"email",
                        type:"varchar",
                    },
                    {
                        name:"senha",
                        type:"varchar",
                    },
                    {
                        name:"isAdmin",
                        type:"boolean",
                        default:false
                    },
                    {
                        name:"data_nascimento",
                        type:"date"
                    },
                    {
                        name:"genero",
                        type:"enum",
                        enum:[
                            "masculino",
                            "feminino",  
                        ],
                        enumName:"sexo_enum"
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
        await queryRunner.dropTable("users")
    }

}
