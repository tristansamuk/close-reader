import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("poets", (table) => {
    table.increments("poet_id").primary();
    table.string("last_name");
    table.string("first_name");
    table.string("url_param");
    table.integer("birth_year");
    table.integer("death_year");
    table.integer("category_id");
    table.string("img");
    table.text("bio");
    table.string("bio_source");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
