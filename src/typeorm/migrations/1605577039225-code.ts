import {MigrationInterface, QueryRunner} from "typeorm";

export class code1605577039225 implements MigrationInterface {
    name = 'code1605577039225'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "code" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "code"`, undefined);
    }

}
