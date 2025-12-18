import fs from 'fs'
import { PDFParse } from 'pdf-parse';

export async function loadPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath)
  const parser = new PDFParse({ data: dataBuffer})
  const result = await parser.getText()

  console.log('Text Content: ', result.text.slice(0,250))

  await parser.destroy()
  return result.text
}
