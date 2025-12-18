import { useState } from "react";
import { query } from "../api";
import Message from "./Message";

export default function ChatBox({ disabled }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");

    try {
      setLoading(true);
      const res = await query(userMsg.text);

      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant",
          text: res.answer,
          sources: res.sources 
        },
      ]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Ask a Question</h3>

      <div className="chat">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} sources={m.sources}/>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <div className="input-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={askQuestion} disabled={disabled || loading}>Send</button>
      </div>
    </div>
  );
}
