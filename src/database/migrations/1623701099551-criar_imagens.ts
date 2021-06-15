import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class criarImagens1623701099551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagens',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orfanato_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'ImagemOrfanato',
                    columnNames: ['orfanato_id'],
                    referencedTableName: 'orfanatos',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagens')
    }

}
