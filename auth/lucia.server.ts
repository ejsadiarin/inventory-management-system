import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { pool } from "../app/db.server";
import { pg } from "@lucia-auth/adapter-postgresql";

export const auth = lucia({
  env: "DEV",
  middleware: web(),
  adapter: pg(pool, {
    user: "auth_user",
    key: "auth_key",
    session: "auth_session",
  }),
});

export type Auth = typeof auth;
