import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import cors from 'cors'

import {loadPdf} from "./ingest/pdfLoader.js"
import {chunkText} from "./ingest/chunker.js"
import { embedAndStore } from './ingest/embedAndStore.js'

import { retrieve } from './query/retrieve.js'
import { answer } from './query/answer.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
const upload = multer({ dest: "uploads/" })

app.post("/api/ingest", upload.single('document'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded"})

    const filePath = req.file.path
    const text = await loadPdf(filePath)
    const chunks = await chunkText(text)
    await embedAndStore(chunks)

    res.json({ message: "File uploaded successfully", chunks: chunks.length})
  } catch (err) {
    console.error("Ingest Error:", err)
    res.status(500).json({ error: "Failed to process PDF"}) 
  }
})

/*---Query Route---*/
app.post("/api/query", async (req, res) => {
  try {
    const {question} = req.body
    if (!question) return res.status(400).json({error: "No Question provided!"})

    const context = await retrieve(question)

    console.log("🔎 Retrieved chunks:", context.length)
    console.log("🔎 First chunk preview:", context[0]?.slice(0, 200))
    
    const result = await answer(question, context)

    res.json({answer: result})
  } catch (err) {
    console.error("Question Error", err)
    res.status(500).json({ error: "Query failed!"})
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))