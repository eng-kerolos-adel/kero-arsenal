import pg from "pg";
import type { OrderInput, OrderRow } from "../../../shared/schemas";

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://postgres:password@localhost:54321/kero";

// Timeout صريح: لو الداتابيز بطيئة/واقعة، الـ API يفشل بسرعة بدل ما يفضل معلّق (Toxiproxy بيختبر ده)
export const pool = new pg.Pool({
  connectionString,
  connectionTimeoutMillis: 3000,
  query_timeout: 5000,
});

export async function listOrders(): Promise<OrderRow[]> {
  const { rows } = await pool.query<OrderRow>(
    "SELECT id, customer, item, amount, created_at FROM orders ORDER BY id DESC LIMIT 50",
  );
  return rows;
}

export async function createOrder(input: OrderInput): Promise<OrderRow> {
  const { rows } = await pool.query<OrderRow>(
    "INSERT INTO orders (customer, item, amount) VALUES ($1, $2, $3) RETURNING id, customer, item, amount, created_at",
    [input.customer, input.item, input.amount],
  );
  const row = rows[0];
  if (!row) throw new Error("Insert failed");
  return row;
}
