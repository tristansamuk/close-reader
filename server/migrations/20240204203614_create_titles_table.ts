import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("titles", (table) => {
    table.increments("title_id").primary();
    table.string("title");
    table.string("author_id");
    table.integer("pub_year");
    table.integer("category_id");
  });
}

export async function down(knex: Knex): Promise<void> {}
