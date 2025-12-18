import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  })

  const chunks = await splitter.createDocuments([text])

  return chunks
}