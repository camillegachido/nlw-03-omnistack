import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602894023206 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      //alteracoes como criar, criar camp, deletar campo
      await queryRunner.createTable(new Table({
        name: 'orphanages',
        columns:[
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'opening_hours',
            type: 'varchar',
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_pendent',
            type: 'boolean',
            default: false,
          },
          {
            name: 'whatsapp',
            type: 'string',
          },
        ]
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      //desfazer algo do metodo up
      await queryRunner.dropTable('orphanages');
  }

}
