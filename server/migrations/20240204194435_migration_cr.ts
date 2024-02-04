import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("poems", (table) => {
    table.increments("id"); // Primary key
    table.integer("author_id");
    table.integer("title_id");
    table.string("lns");
    table.timestamp("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {}
