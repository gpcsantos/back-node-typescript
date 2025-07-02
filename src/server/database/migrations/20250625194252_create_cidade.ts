import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


// cria o arquivo de migração
// yarn knex --knexfile ./src/server/database/knex/Environment.ts migrate:make create_cidade

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cidade, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();

      table.comment('Tabela usada para aramazenar cidades do sistema');
    })
    .then(() => {
      console.log(`# Created TABLE - ${ETableNames.cidade}`)
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`# Droped TABLE - ${ETableNames.cidade}`)
    });
}

