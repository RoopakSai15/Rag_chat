require('dotenv').config()
module.exports = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  VECTOR_STORE_PATH: process.env.VECTOR_STORE_PATH || './vectors.db'
}