import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("titles", (table) => {
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .alterTable("categories", (table) => {
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .alterTable("poems", (table) => {
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {}
