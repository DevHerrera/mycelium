import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1733810262679 implements MigrationInterface {
  name = 'InitialMigration1733810262679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."link_type_enum" AS ENUM('facebook', 'instagram', 'twitter', 'onlyfans', 'youtube', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying NOT NULL, "description" character varying, "active" boolean NOT NULL DEFAULT true, "nsfw" boolean DEFAULT false, "type" "public"."link_type_enum" NOT NULL DEFAULT 'other', "userId" uuid NOT NULL, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "profileImageUrl" character varying NOT NULL, "backgroundImageUrl" character varying NOT NULL, "qrCode" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_ae1d917992dd0c9d9bbdad06c4" UNIQUE ("userId"), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_type_enum" AS ENUM('company', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "lastActive" TIMESTAMP NOT NULL, "type" "public"."user_type_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "page" ADD CONSTRAINT "FK_ae1d917992dd0c9d9bbdad06c4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "page" DROP CONSTRAINT "FK_ae1d917992dd0c9d9bbdad06c4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TABLE "link"`);
    await queryRunner.query(`DROP TYPE "public"."link_type_enum"`);
  }
}
