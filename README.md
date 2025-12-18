# 📄 RAG Chat

A **Retrieval-Augmented Generation (RAG)** chat application that enables users to upload PDF documents and ask questions. Answers are generated exclusively from the document content, with transparent source references for full traceability.

---

## ✨ Features

- **PDF Document Upload** – Seamlessly upload PDF files for processing
- **Automatic Chunking & Embedding** – Documents are intelligently split and vectorized
- **Vector Search with ChromaDB** – Fast and accurate semantic search across document chunks
- **Context-Only Answers** – Powered by Google Gemini API, ensuring responses are grounded in your documents
- **Source References** – Every answer includes the exact chunks used, displayed for verification
- **Smart Chat Control** – Chat interface is disabled until a document is successfully ingested

---

## 🏗️ Tech Stack

### Backend

- **Node.js** + **Express** – Server framework
- **Google Gemini API** – Language model for answer generation
- **ChromaDB** – Vector database for embeddings
- **Docker** & **Docker Compose** – Containerized deployment

### Frontend

- **React** – UI framework
- **Vite** – Fast development and build tooling
- **Fetch API** – HTTP requests
- **CSS** – Styling

---

## 📁 Project Structure

```
rag-chat/
├── backend/
│   ├── src/
│   │   ├── ingest/          # PDF processing and chunking logic
│   │   ├── query/            # Query handling and RAG pipeline
│   │   ├── vectorstore/      # ChromaDB integration
│   │   └── server.js         # Express server entry point
│   ├── docker-compose.yml    # Docker services configuration
│   ├── package.json
│   └── .env                  # Environment variables
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── App.jsx           # Main app component
    │   └── api.js            # API service layer
    ├── package.json
    └── vite.config.js
```

---

## 🔌 API Endpoints

### Ingest PDF

**POST** `/api/ingest`

Upload and process a PDF document.

**Request:**

- Content-Type: `multipart/form-data`
- Body: `file` (PDF file)

**Response:**

```json
{
  "message": "File uploaded successfully",
  "chunks": 36
}
```

### Query Document

**POST** `/api/query`

Ask questions about the ingested document.

**Request:**

```json
{
  "query": "What is the main topic of this document?"
}
```

**Response:**

```json
{
  "answer": "The main topic is...",
  "sources": ["chunk text 1 from page 3", "chunk text 2 from page 7"]
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Docker** & **Docker Compose**
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### 🐳 Backend Setup

1. Navigate to the backend directory:

```bash
   cd backend
```

2. Create a `.env` file:

```env
   GEMINI_API_KEY=your_api_key_here
   CHROMA_HOST=chromadb
```

3. Start the services:

```bash
   docker compose up --build
```

4. Services will be available at:
   - **Backend API:** http://localhost:5000
   - **ChromaDB:** http://localhost:8000

### 🎨 Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open your browser:
   - **Frontend:** http://localhost:5173

---

## 🧠 How It Works

1. **Document Ingestion** – PDFs are uploaded, parsed, and split into semantic chunks
2. **Vectorization** – Each chunk is embedded and stored in ChromaDB
3. **Query Processing** – User questions are embedded and matched against stored chunks
4. **Answer Generation** – Google Gemini generates answers using only the retrieved chunks
5. **Source Display** – The exact source chunks are shown alongside each answer

### Key Design Principles

- ✅ **Grounded Responses** – Answers derived exclusively from document content
- ✅ **Transparent Sources** – Full traceability with chunk-level references
- ✅ **Modular Architecture** – Clean separation between ingestion and query logic

---

## 📝 Environment Variables

### Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key
CHROMA_HOST=chromadb
PORT=5000
```

---

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build

# Backend runs via Docker in production
```

---

## 📦 Docker Services

The `docker-compose.yml` defines two services:

- **chromadb** – Vector database (port 8000)
- **backend** – Node.js API server (port 5000)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---
