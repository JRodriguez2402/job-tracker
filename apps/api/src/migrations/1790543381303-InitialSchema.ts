import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1790543381303 implements MigrationInterface {
    name = 'InitialSchema1790543381303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // uuid_generate_v4() (used by the uuid primary keys) needs this extension.
        // A fresh managed database (e.g. Neon) won't have it, so create it first.
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."applications_stage_enum" AS ENUM('SAVED', 'APPLIED', 'SCREENING', 'TECHNICAL', 'OFFER', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company" character varying NOT NULL, "role" character varying NOT NULL, "url" text, "salary" text, "stack" text array NOT NULL DEFAULT '{}', "appliedDate" date, "stage" "public"."applications_stage_enum" NOT NULL DEFAULT 'SAVED', "notes" text, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_90ad8bec24861de0180f638b9c" ON "applications"  ("userId") `);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90ad8bec24861de0180f638b9c"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_stage_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
