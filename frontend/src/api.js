const BASE_URL = "https://rag-chat-backend-7cbn.onrender.com"

export async function ingest(file) {
  const formData = new FormData()
  formData.append("document", file)

  const res = await fetch(`${BASE_URL}/api/ingest`, {
    method: "POST",
    body: formData
  })

  if (!res.ok) {
    throw new Error("PDF ingestion failed")
  }

  return res.json()
}

export async function query(question) {
  const res = await fetch(`${BASE_URL}/api/query`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json" 
    },
    body: JSON.stringify({question})
  })

  if (!res.ok) {
    throw new Error("Query failed")
  }

  return res.json()
}