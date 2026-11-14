CREATE TABLE IF NOT EXISTS orders (
  id         SERIAL PRIMARY KEY,
  customer   TEXT        NOT NULL,
  item       TEXT        NOT NULL,
  amount     INTEGER     NOT NULL CHECK (amount > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO orders (customer, item, amount) VALUES
  ('Ahmed', 'Next.js Landing Page', 1500),
  ('Mona',  'Flutter App Audit',    2500);
