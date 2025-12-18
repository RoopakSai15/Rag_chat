import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const STORE_PATH = path.join(__dirname, "../../vectorstore.json")

export async function saveVectors(vectors){
  fs.writeFileSync(STORE_PATH, JSON.stringify(vectors, null, 2))
}

export async function loadVectors() {
  if (!fs.existsSync(STORE_PATH)) return []
  const data = fs.readFileSync(STORE_PATH, "utf-8")
  return JSON.parse(data)
}