import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

await client.deleteCollection({ name: "documents" });
console.log("Deleted old collection");
process.exit(0);
