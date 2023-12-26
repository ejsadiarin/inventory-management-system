import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { Pool, neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.fetchConnectionCache = true;
neonConfig.webSocketConstructor = ws;

// neon: use WebSocket connection for auth & use HTTP connection for everything else (CRUD, etc.)
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const http = neon(process.env.DATABASE_URL as string);

// do with drizzle
export const dbPool = drizzleWs(pool);
export const dbHttp = drizzleHttp(http);
