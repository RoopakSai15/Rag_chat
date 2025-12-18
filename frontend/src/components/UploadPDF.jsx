import { useState } from "react";
import { ingest } from "../api";

export default function UploadPDF({ onIngested }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true)
      const res = await ingest(file)
      onIngested(res)
    } catch(err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3>Upload a PDF</h3>
      <input 
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Ingesting..." : "Upload"}
      </button>
    </div>
  )
}