import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("execution_steps", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("execution_id")
      .notNullable()
      .references("id")
      .inTable("executions")
      .onDelete("CASCADE")
      .index();
    table
      .uuid("step_id")
      .notNullable()
      .references("id")
      .inTable("steps")
      .onDelete("CASCADE")
      .index();
    table.string("status").notNullable();
    table.text("data_in").notNullable();
    table.text("data_out");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("execution_steps");
}
