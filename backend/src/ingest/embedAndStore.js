import {GoogleGenerativeAI} from '@google/generative-ai'
import dotenv from "dotenv";
import { addDocuments } from '../vectorstore/chroma.js'

dotenv.config()
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function embedAndStore(chunks){
  const texts = []
  const vectors = []
  const model = ai.getGenerativeModel({model: 'text-embedding-004'})
  for (const chunk of chunks) {
    const text = typeof chunk === "string" ? chunk : chunk.pageContent

    const response = await model.embedContent({
      content: {
        parts: [{ text }]
      }
    })

    texts.push(text) 
    vectors.push(response.embedding.values)
  }

    console.log(`Saving ${texts.length} vectors...`)
    await addDocuments(texts, vectors)
    console.log('Vectors saved successfully')
}