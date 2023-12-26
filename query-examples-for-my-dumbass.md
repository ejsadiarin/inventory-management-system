Query description:

- base on this schema, create 3 users and 3 items (1 item for each user, with their foreign key). Generate two versions of the query (Drizzle ORM syntax and SQL)

```ts
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  category: text("category"),
  ownerId: integer("owner_id").references(() => users.id),
});
```

Drizzle ORM syntax:

```ts
import { users, items } from "./schema"; // Assuming the provided schema is in 'schema.ts'

const createUserAndItem = async (db) => {
  await db
    .insertInto(users)
    .values({
      name: "User1",
      email: "user1@example.com",
      password: "pwd1",
      role: "customer",
    });
  await db
    .insertInto(users)
    .values({
      name: "User2",
      email: "user2@example.com",
      password: "pwd2",
      role: "customer",
    });
  await db
    .insertInto(users)
    .values({
      name: "User3",
      email: "user3@example.com",
      password: "pwd3",
      role: "customer",
    });

  const user1Id = (
    await db
      .select(users.id)
      .from(users)
      .where(users.name.eq("User1"))
      .execute()
  )[0].id;
  const user2Id = (
    await db
      .select(users.id)
      .from(users)
      .where(users.name.eq("User2"))
      .execute()
  )[0].id;
  const user3Id = (
    await db
      .select(users.id)
      .from(users)
      .where(users.name.eq("User3"))
      .execute()
  )[0].id;

  await db
    .insertInto(items)
    .values({
      name: "Item1",
      description: "Description1",
      category: "Category1",
      ownerId: user1Id,
    });
  await db
    .insertInto(items)
    .values({
      name: "Item2",
      description: "Description2",
      category: "Category2",
      ownerId: user2Id,
    });
  await db
    .insertInto(items)
    .values({
      name: "Item3",
      description: "Description3",
      category: "Category3",
      ownerId: user3Id,
    });
};
```

```sql
INSERT INTO users (name, email, password, role) VALUES ('User1', 'user1@example.com', 'pwd1', 'customer');
INSERT INTO users (name, email, password, role) VALUES ('User2', 'user2@example.com', 'pwd2', 'customer');
INSERT INTO users (name, email, password, role) VALUES ('User3', 'user3@example.com', 'pwd3', 'customer');

INSERT INTO items (name, description, category, owner_id) VALUES ('Item1', 'Description1', 'Category1', (SELECT id FROM users WHERE name = 'User1'));
INSERT INTO items (name, description, category, owner_id) VALUES ('Item2', 'Description2', 'Category2', (SELECT id FROM users WHERE name = 'User2'));
INSERT INTO items (name, description, category, owner_id) VALUES ('Item3', 'Description3', 'Category3', (SELECT id FROM users WHERE name = 'User3'));
```
