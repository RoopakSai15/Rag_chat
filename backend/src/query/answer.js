// src/query/answer.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODELS = [
  "models/gemini-2.5-flash",
  "models/gemini-2.0-flash",
  "models/gemma-3-4b-it",
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithRetry(modelName, prompt, retries = 3) {
  const model = ai.getGenerativeModel({ model: modelName });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      return result.response.text();
    } catch (err) {
      if (err.status === 503 && attempt < retries) {
        // exponential backoff
        const delay = 500 * Math.pow(2, attempt);
        console.warn(
          `⚠️ ${modelName} overloaded. Retry ${attempt}/${retries} in ${delay}ms`
        );
        await sleep(delay);
        continue;
      }
      throw err;
    }
  }
}

export async function answer(question, contextChunks) {
  const context = contextChunks.join("\n\n");

  const prompt = `Use the following context to answer the question accurately.
If the answer is not in the context, say you do not know.

Context:
${context}

Question:
${question}`;

  for (const modelName of MODELS) {
    try {
      console.log(`🧠 Trying model: ${modelName}`);
      return await generateWithRetry(modelName, prompt);
    } catch (err) {
      console.warn(`❌ Model failed: ${modelName}`, err.status);
    }
  }

  throw new Error("All Gemini models are currently unavailable");
}
