import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("analyses", (table) => {
    table.increments("analysis_id").primary();
    table.integer("title_id");
    table.text("analysis");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
