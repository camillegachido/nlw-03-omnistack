import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1602894087761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
              {
                name: 'email',
                type: 'varchar',
                isPrimary: true,
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'password',
                type: 'varchar',
              },
              {
                name: 'passwordResetToken',
                type: 'varchar',
                isNullable: true,
              },
            ]
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
