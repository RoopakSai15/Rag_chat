export default function Message({ role, text, sources }) {
  return (
    <div className={`message ${role}`}>
      <strong>{role === "user" ? "You" : "RAG"}:</strong>
      <p>{text}</p>

      {sources && (
        <div className="sources">
          <strong>Sources:</strong>
          <ul>
            {sources.map((s, i) => (
              <li key={i}>
                {s.slice(0, 150)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
