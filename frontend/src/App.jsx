import UploadPDF from "components/UploadPDF";
import ChatBox from "components/ChatBox.jsx";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [ingested, setIngested] = useState(false)
  const [chunks, setChunks] = useState(0)


  return (
    <div className="container">
      <h1>📄 RAG Chat</h1>
      <UploadPDF onIngested={(res) => console.log(res)} />
        {ingested && (
          <p className="status">
            Document ingested ({chunks} chunks)
          </p>
        )}
      <ChatBox disabled={!ingested}/>
    </div>
  );
}
