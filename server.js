import "dotenv/config";
import dns from "dns";
import app from "./src/app.js";

import { connectMongo } from "./src/config/mongo.js";
import { connectPostgres } from "./src/config/db.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectMongo();
await connectPostgres();

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
