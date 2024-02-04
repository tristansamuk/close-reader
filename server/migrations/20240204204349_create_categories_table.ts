import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("categories", (table) => {
    table.increments("category_id").primary();
    table.string("category");
    table.timestamp("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {}
