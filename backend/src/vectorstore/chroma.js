import { ChromaClient } from "chromadb"
import { v4 as uuidv4} from "uuid"

const client = new ChromaClient({
  host: process.env.CHROMA_HOST.replace("https://", "") || "chromadb",
  port: process.env.CHROMA_PORT || 8000,
  ssl: false
})

const COLLECTION_NAME = "documents"

let collection;

async function initCollection() {
  if (!collection) {
    collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
      embeddingFunction: null
    })
  }
  return collection
}

export async function addDocuments(texts, embeddings) {
  const collection = await initCollection()

  await collection.add({
    ids: texts.map(() => uuidv4()),
    documents: texts,
    embeddings,
  })
}

export async function queryDocuments(queryEmbeddings, topK = 3) {
  const collection = await initCollection()

  const results = await collection.query({
    queryEmbeddings: [queryEmbeddings],
    nResults: topK,
  })

  return results.documents[0]
}