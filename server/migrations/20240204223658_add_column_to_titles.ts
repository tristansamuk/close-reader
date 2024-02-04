import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("titles", (table) => {
    table.string("short_title");
  });
}

export async function down(knex: Knex): Promise<void> {}
