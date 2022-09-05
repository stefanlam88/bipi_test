exports.up = (knex, Promise) => {
  return knex.schema.createTable("merchant", table => {
    table.increments("id").primary();
    table.string("merchant_name").notNullable();
    table.string("phone_number");
    table.decimal("latitude", 8, 2);
    table.decimal("longitude", 8, 2);
    table.boolean("is_active").defaultTo(0);
    table
      .timestamp("recorded_date")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists("merchant");
};
