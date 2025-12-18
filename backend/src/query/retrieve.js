import { GoogleGenerativeAI } from '@google/generative-ai'
import { queryDocuments } from '../vectorstore/chroma.js'

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// function cosineSimilarity(a, b){
//   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
//   const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
//   const magB = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
//   return dot / (magA * magB)
// }
export async function retrieveRelevantChunks(questionEmbedding) {
  const results = await collection.query({
    queryEmbeddings: [questionEmbedding],
    nResults: 3
  })

  return results.documents[0]
}


export async function retrieve(question, topK = 3){
  const model = ai.getGenerativeModel({model: 'text-embedding-004'}) 
  const response = await model.embedContent({
    content: {
      parts: [{text : question}],
    },
  })

  const queryEmbedding = response.embedding.values

  const docs = await queryDocuments(queryEmbedding, topK)
  
  return docs
}