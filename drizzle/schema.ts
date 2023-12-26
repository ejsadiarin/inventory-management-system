import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const items = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  category: text("category"),
});
