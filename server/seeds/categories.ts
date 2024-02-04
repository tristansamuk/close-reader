import { Knex } from "knex";
import categories from "../seed-data/categories";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("categories").del();

  // Inserts seed entries
  await knex("categories").insert(categories);
}
