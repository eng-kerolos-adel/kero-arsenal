import { ensureProxy } from "../tests/helpers/toxiproxy";

await ensureProxy("postgres_main", "0.0.0.0:54322", "postgres:5432");
console.log("✅ Proxy جاهز: localhost:54322 → postgres:5432 (عن طريق Toxiproxy)");
